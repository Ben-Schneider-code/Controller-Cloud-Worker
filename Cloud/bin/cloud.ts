#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import {hello_stack} from "../lib/lambda/basic-lambda/aws-definition";

const app = new cdk.App();
new hello_stack(app, "cdk-hello")

app.synth()
