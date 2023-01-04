#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { cognito_stack } from "../lib/cognito/cognito_stack";

import { s3_stack } from "../lib/s3/s3-stack";
import { lambda_stack } from "../lib/lambda/aws-definition";
import { table_stack } from "../lib/data-model/dynamo";

let resourceDict: any = {};

const app = new cdk.App();

const cognito = new cognito_stack(app, "cognito", resourceDict);
new table_stack(app, "table", resourceDict);
new s3_stack(app, "s3", resourceDict);
new lambda_stack(app, "lambda", resourceDict, cognito.info);
app.synth();
