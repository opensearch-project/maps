/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Define AWS resources for ECS task state change event rule.
 */

import { StackProps, NestedStack } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as events from 'aws-cdk-lib/aws-events';

export interface EventRuleStackProps extends StackProps {
    cluster: ecs.Cluster;
}

export class EventRuleStack extends NestedStack {
    public readonly rule: events.Rule;
    constructor(scope: Construct, id: string, props: EventRuleStackProps) {
        super(scope, id);

        const clusterArn = props.cluster.clusterArn;

        this.rule = new events.Rule(this, 'ecs-task-state-change-rule', {
            eventPattern: {
                source: ['aws.ecs'],
                detailType: ['ECS Task State Change'],
                detail: {
                    clusterArn: [clusterArn],
                    lastStatus: ['RUNNING', 'STOPPED', 'PROVISIONING'],
                },
            },
        });
    }
}
