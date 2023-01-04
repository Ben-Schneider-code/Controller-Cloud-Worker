import { Stack, StackProps, Duration } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";

export type Cognito = {
  pool: cognito.UserPool;
  client: cognito.UserPoolClient;
} | null;

export class cognito_stack extends Stack {
  info: Cognito = null;

  constructor(scope: Construct, id: string, dict: any, props?: StackProps) {
    super(scope, id, props);

    const pool = new cognito.UserPool(this, "default_pool");
    const client = pool.addClient("default_client", {
      idTokenValidity: Duration.days(1),
      authFlows: { userPassword: true },
      generateSecret: false,
    });

    this.info = {
      pool: pool,
      client: client,
    };
  }
}
