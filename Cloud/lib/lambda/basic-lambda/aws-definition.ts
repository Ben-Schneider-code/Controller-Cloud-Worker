import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as cdk from 'aws-cdk-lib';


export class hello_stack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        //  lambda function definition
        const lambdaFunction = new lambda.Function(this, 'lambda-function', {
            runtime: lambda.Runtime.NODEJS_14_X,
            memorySize: 1024,
            timeout: cdk.Duration.seconds(5),
            handler: 'index.main',
            code: lambda.Code.fromAsset("./"),
            environment: {
                REGION: cdk.Stack.of(this).region,
                AVAILABILITY_ZONES: JSON.stringify(
                    cdk.Stack.of(this).availabilityZones,
                ),
            },
        });
    }
}