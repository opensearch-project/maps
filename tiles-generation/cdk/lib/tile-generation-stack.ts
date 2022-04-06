/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 *
 * Define AWS resources for tiles generation.
 */

import { CfnOutput, Environment, Stack, StackProps } from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as asc from "aws-cdk-lib/aws-autoscaling";

 export interface TileGenerationStackProps extends StackProps {
    env: Environment,
    instanceType: ec2.InstanceType,
    volume: asc.BlockDeviceVolume,
    sharedMemorySize: number,
    dockerEnv: {[key: string]: string},
    memoryReservationMiB: number,
    clusterArnExportName: string
 }

export class TileGenerationStack extends Stack {
    constructor(
        scope: Construct, 
        id: string,
        props: TileGenerationStackProps) {
        super(scope, id);

        const tilesDestinationBucket = this.node.tryGetContext('BUCKET');

        props.dockerEnv['TILE_S3_BUCKET'] = tilesDestinationBucket;

        const vpc = new ec2.Vpc(this, `vpc-${this.stackName}`, {
            cidr: '10.0.0.0/16',
            natGateways: 1,
            maxAzs: 2
        });

        const cluster = new ecs.Cluster(this, `cluster-${this.stackName}`, {
        vpc: vpc,
        });

        new CfnOutput(this, props.clusterArnExportName, {
            value: cluster.clusterArn,
            exportName: props.clusterArnExportName
        });

        const autoScalingGroup = new asc.AutoScalingGroup(this, `autoScalingGroup-${this.stackName}`, {
            vpc,
            instanceType: props.instanceType,
            machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
            minCapacity: 0,
            desiredCapacity: 0,
            maxCapacity: 1,
            newInstancesProtectedFromScaleIn: true,
            blockDevices: [{
                deviceName: "/dev/xvda",
                volume: props.volume
            }]
        });
          
        const capacityProvider = new ecs.AsgCapacityProvider(this, `AsgCapacityProvider-${this.stackName}`, {
            autoScalingGroup,
            enableManagedScaling: true
        });

        new CfnOutput(this, 'CapacityProviderName', {
            value: capacityProvider.capacityProviderName 
        });

        cluster.addAsgCapacityProvider(capacityProvider);

        const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TaskDef');

        new CfnOutput(this, 'TaskDefinitionArn', {
            value: taskDefinition.taskDefinitionArn
        });

        const taskRolePolicy =  new iam.PolicyStatement({
            actions: [
                "s3:PutObject",
                "s3:GetObject",
            ],
            resources: ['*']
        })

        taskDefinition.addToTaskRolePolicy(taskRolePolicy);

        const logging = new ecs.AwsLogDriver({
            streamPrefix: `logs-${this.stackName}`
        });

        const linuxParameters = new ecs.LinuxParameters(this, `LinuxParameters-${this.stackName}`, {
            sharedMemorySize: props.sharedMemorySize
        });

        taskDefinition.addContainer('DefaultContainer', {
            image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../dockerAssets/')),
            memoryReservationMiB: props.memoryReservationMiB,
            command: ['generatetiles'],
            logging:logging,
            environment: props.dockerEnv,
            linuxParameters: linuxParameters
        });
    }
}