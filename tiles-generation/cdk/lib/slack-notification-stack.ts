/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Define AWS resources for ECS task state change notification to Slack.
 */

import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EventRuleStack } from './event-rule-stack';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export interface SlackNotificationStackProps extends StackProps {
    env: Environment;
    cluster: ecs.Cluster;
}

export class SlackNotificationStack extends Stack {
    constructor(
        scope: Construct,
        id: string,
        props: SlackNotificationStackProps
    ) {
        super(scope, id);

        const slackHookPath = this.node.tryGetContext('SLACK');

        const eventRuleStack = new EventRuleStack(this, 'EventRuleStack', {
            cluster: props.cluster,
        });

        const { rule } = eventRuleStack;

        const taskStatusSlackNotifyLambda = new lambda.Function(
            this,
            'slack-function',
            {
                runtime: lambda.Runtime.NODEJS_14_X,
                code: lambda.Code.fromAsset('lambda'),
                handler: 'slack-notification.handler',
                environment: {
                    slackHookPath: slackHookPath,
                },
            }
        );

        rule.addTarget(new targets.LambdaFunction(taskStatusSlackNotifyLambda));
    }
}
