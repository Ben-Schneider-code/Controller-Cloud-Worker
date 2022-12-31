import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";

export class s3_stack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, dict: any, props?: cdk.StackProps) {
    super(scope, id, props);

    const job = new s3.Bucket(this, "job-bucket", {
      versioned: false,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const result = new s3.Bucket(this, "result-bucket", {
      versioned: false,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    dict["jobS3"] = job.bucketName;
    dict["resultS3"] = result.bucketName;
  }
}
