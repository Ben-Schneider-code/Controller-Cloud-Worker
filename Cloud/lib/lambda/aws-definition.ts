import * as cdk from "aws-cdk-lib";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import { IntegrationType } from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Cognito } from "../../lib/cognito/cognito_stack";

export class lambda_stack extends cdk.Stack {
  constructor(
    scope: cdk.App,
    id: string,
    dict: any,
    cognito: Cognito,
    props?: cdk.StackProps
  ) {
    super(scope, id, props);

    const LambdaRole = new cdk.aws_iam.Role(this, "LambdaRole", {
      assumedBy: new cdk.aws_iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    LambdaRole.addManagedPolicy(
      cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
        "AmazonDynamoDBFullAccess"
      )
    );

    LambdaRole.addManagedPolicy(
      cdk.aws_iam.ManagedPolicy.fromManagedPolicyArn(
        this,
        "log_write",
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
      )
    );

    LambdaRole.addManagedPolicy(
      cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3FullAccess")
    );

    const pushJob = new_lambda(
      this,
      "pushJob",
      "./lib/lambda/push-job",
      dict,
      LambdaRole
    );
    const putFile = new_lambda(
      this,
      "putFile",
      "./lib/lambda/put-file",
      dict,
      LambdaRole
    );

    dict["pushJobLambda"] = pushJob.functionName;
    dict["putFileLambda"] = putFile.functionName;

    const restApi = new apigateway.RestApi(this, "api", {});
    const file = restApi.root.addResource("addFile");
    const job = restApi.root.addResource("addJob");

    const jobLambdaIntegration = new apigateway.LambdaIntegration(pushJob, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });
    const fileLambdaIntegration = new apigateway.LambdaIntegration(putFile, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    });

    const integrationConfig: apigateway.IntegrationConfig = {
      type: IntegrationType.AWS_PROXY,
    };
    const auth1 = new apigateway.CognitoUserPoolsAuthorizer(this, "api-auth1", {
      // @ts-ignore
      cognitoUserPools: [cognito.pool],
    });

    job.addMethod("POST", jobLambdaIntegration, { authorizer: auth1 });
    file.addMethod("POST", fileLambdaIntegration, { authorizer: auth1 });
  }
}

const new_lambda = (
  context: lambda_stack,
  id: string,
  path: string,
  dict: any,
  role?: cdk.aws_iam.Role
) =>
  new lambda.Function(context, id, {
    functionName: id,
    runtime: lambda.Runtime.NODEJS_14_X,
    memorySize: 1024,
    role: role,
    timeout: cdk.Duration.seconds(50),
    handler: "index.handler",
    code: lambda.Code.fromAsset(path),
    environment: dict,
  });
