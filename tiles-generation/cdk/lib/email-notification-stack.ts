/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Define AWS resources for ECS task state change notification to email.
 */

import { Environment, Fn, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";
import * as subscriptions from "aws-cdk-lib/aws-sns-subscriptions"
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from 'aws-cdk-lib/aws-lambda';

export interface EmailNotificationStackProps extends StackProps {
    env: Environment,
    clusterArnExportName: string
}

export class EmailNotificationStack extends Stack {
    constructor(scope: Construct, id: string, props: EmailNotificationStackProps ) {
        super(scope, id);

        const clusterArn = Fn.importValue(props.clusterArnExportName);

        const topic = new sns.Topic(this, "topic");

        const email = this.node.tryGetContext('EMAIL');

        if (email !== undefined) {
            topic.addSubscription(new subscriptions.EmailSubscription(email));
        }

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

        const taskStatusEmailNotifyLambda = new lambda.Function(this, 'emailFunction', {
            runtime: lambda.Runtime.NODEJS_14_X, 
            code: lambda.Code.fromAsset("lambda"),
            handler: "email-notification.handler",
            environment: {
                "topicArn": topic.topicArn
            }
        });

        const lambdaRolePolicy =  new iam.PolicyStatement({
            actions: [
                "sns:Publish"
            ],
            resources: [topic.topicArn]
        });

        taskStatusEmailNotifyLambda.addToRolePolicy(lambdaRolePolicy);

        rule.addTarget(new targets.LambdaFunction(
            taskStatusEmailNotifyLambda
        ));
    }
}