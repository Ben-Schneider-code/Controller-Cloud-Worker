import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class table_stack extends Stack {
  constructor(scope: Construct, id: string, dict: any, props?: StackProps) {
    super(scope, id, props);
    const jobTable = new dynamodb.Table(this, "job", {
      partitionKey: {
        name: "job_name",
        type: dynamodb.AttributeType.STRING,
      },
    });

    const resultTable = new dynamodb.Table(this, "result", {
      partitionKey: {
        name: "id",
        type: dynamodb.AttributeType.STRING,
      },
    });

    dict["resultTable"] = resultTable.tableName;
    dict["jobTable"] = jobTable.tableName;
  }
}
