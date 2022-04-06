/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Define AWS resources for ECS task state change notification to slack.
 */

import { Environment, Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface SlackNotificationStackProps extends StackProps {
    env: Environment,
    clusterArnExportName: string
}

export class SlackNotificationStack extends Stack {
    constructor(scope: Construct, id: string, props: SlackNotificationStackProps ) {
        super(scope, id);

        const clusterArn = Fn.importValue(props.clusterArnExportName);

        const rule = new events.Rule(this, `ecs-task-state-change-email-rule`, {
            eventPattern: {
              source: ["aws.ecs"],
              detailType: ["ECS Task State Change"],
              detail: {
                  "clusterArn": [clusterArn],
                  "lastStatus": ["RUNNING", "STOPPED", "PROVISIONING"]
              },
            },
        });

        const slackHookPath = this.node.tryGetContext('SLACK');

        const taskStatusSlackNotifyLambda = new lambda.Function(this, 'slack-function', {
            runtime: lambda.Runtime.NODEJS_14_X, 
            code: lambda.Code.fromAsset("lambda"),
            handler: "slack-notification.handler",
            environment: {
                "slackHookPath": slackHookPath
            }
        });

        rule.addTarget(new targets.LambdaFunction(
            taskStatusSlackNotifyLambda
        ));
    }
}