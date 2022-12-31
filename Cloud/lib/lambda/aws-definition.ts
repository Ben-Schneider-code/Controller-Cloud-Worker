import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';


export class lambda_stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // new_lambda(this, 'test_lambda' ,"./lib/lambda/basic-lambda" )

    }
}



const new_lambda = (context : lambda_stack, id: string, path: string)=>
new lambda.Function(context, id, {
    runtime: lambda.Runtime.NODEJS_14_X,
    memorySize: 1024,
    timeout: cdk.Duration.seconds(5),
    handler: 'index.handler',
    code: lambda.Code.fromAsset(path),
    environment: {
        REGION: cdk.Stack.of(context).region,
        AVAILABILITY_ZONES: JSON.stringify(
            cdk.Stack.of(context).availabilityZones,
        ),
    },
});