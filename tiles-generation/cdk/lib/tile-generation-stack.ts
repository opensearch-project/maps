/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Environment, Stack, StackProps } from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";
import * as iam from "aws-cdk-lib/aws-iam";
import * as ats from "aws-cdk-lib/aws-applicationautoscaling";
import * as asc from "aws-cdk-lib/aws-autoscaling";
import * as autoscaling from "aws-cdk-lib/aws-autoscaling"

 export interface TileGenerationStackProps extends StackProps {
    env: Environment,
    instanceType: ec2.InstanceType,
    volume: asc.BlockDeviceVolume,
    sharedMemorySize: number,
    dockerEnv: {[key: string]: string},
    memoryReservationMiB: number,
    schedule: ats.Schedule,
 }

export class TileGenerationStack extends Stack {
    constructor(
        scope: Construct, 
        id: string,
        props: TileGenerationStackProps) {
        super(scope, id);

        const uploadTestBucketName = this.node.tryGetContext('TILE_S3_BUCKET');

        props.dockerEnv['TILE_S3_BUCKET'] = uploadTestBucketName

        const vpc = new ec2.Vpc(this, `vpc-${this.stackName}`, {
            cidr: '10.0.0.0/16',
            natGateways: 1,
            maxAzs: 2
        });

        const cluster = new ecs.Cluster(this, `cluster-${this.stackName}`, {
        vpc: vpc,
        });

        const autoScalingGroup = new autoscaling.AutoScalingGroup(this, `autoScalingGroup-${this.stackName}`, {
            vpc,
            instanceType: props.instanceType,
            machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
            minCapacity: 0,
            desiredCapacity: 1,
            maxCapacity: 1,
            blockDevices: [{
                deviceName: "/dev/xvda",
                volume: props.volume
            }]
        });
          
        const capacityProvider = new ecs.AsgCapacityProvider(this, `AsgCapacityProvider-${this.stackName}`, {
            autoScalingGroup,
        });

        cluster.addAsgCapacityProvider(capacityProvider);
          
        const logging = new ecs.AwsLogDriver({
            streamPrefix: `logs-${this.stackName}`
        });

        const taskRolePolicy =  new iam.PolicyStatement({
            actions: [
                "s3:PutObject",
                "s3:GetObject",
            ],
            resources: ['*']
        })

        const scheduledTaskDef = new ecs.TaskDefinition(this, `scheduledTaskDef-${this.stackName}`, {
            compatibility: ecs.Compatibility.EC2,
            networkMode: ecs.NetworkMode.AWS_VPC,
        })

        scheduledTaskDef.addToTaskRolePolicy(taskRolePolicy);

        const linuxParameters = new ecs.LinuxParameters(this, `LinuxParameters-${this.stackName}`, {
            initProcessEnabled: false,
            sharedMemorySize: props.sharedMemorySize
        });

        scheduledTaskDef.addContainer(`container-${this.stackName}`, {
            image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../dockerAssets/')),
            memoryReservationMiB: props.memoryReservationMiB,
            command: ['generatetiles'],
            environment: props.dockerEnv,
            logging,
            linuxParameters
        });

        new ecs_patterns.ScheduledEc2Task(this, `ScheduledTask-${this.stackName}`, {
            cluster: cluster,
            scheduledEc2TaskDefinitionOptions: {
                taskDefinition: scheduledTaskDef
            },
            schedule: props.schedule,
            enabled: true,
            ruleName: `scheduled-task-rule-${this.stackName}`,
        })
    }
}