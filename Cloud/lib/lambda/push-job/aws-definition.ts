import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';


export class hello_stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        //  lambda function definition
        new lambda.Function(this, 'test_lambda', {
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            handler: 'index.handler',
            code: lambda.Code.fromAsset("./lib/lambda/basic-lambda"),
            environment: {
                REGION: cdk.Stack.of(this).region,
                AVAILABILITY_ZONES: JSON.stringify(
                    cdk.Stack.of(this).availabilityZones,
                ),
            },
        });
    }
}