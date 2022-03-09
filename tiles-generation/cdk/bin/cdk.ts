#!/usr/bin/env node

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { App, Duration } from 'aws-cdk-lib';
import { TileGenerationStack } from '../lib/tile-generation-stack'
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as asc from "aws-cdk-lib/aws-autoscaling";
import * as event from "aws-cdk-lib/aws-events"

const app = new App();

const env = {
  region: app.node.tryGetContext('region') || process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
  account: app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT
};

const testInstanceType = ec2.InstanceType.of(ec2.InstanceClass.MEMORY3, ec2.InstanceSize.XLARGE);

const testDockerEnv = {
  'BBOX':'5.654568,49.431689,6.574673,50.177945',
  'DOWNLOAD_PBF':'https://download.geofabrik.de/europe/luxembourg-latest.osm.pbf',
  'OSM2PGSQL_EXTRA_ARGS':'-C 10000',
  'MIN_ZOOM':'0',
  'MAX_ZOOM':'10',
  'THREADS':'8',
  'PYTHONUNBUFFERED':'1',
  'AUTOVACUUM':'off',
};

const testEC2Volume = asc.BlockDeviceVolume.ebs(30, {
  deleteOnTermination: true,
  volumeType: asc.EbsDeviceVolumeType.IO1,
  iops: 1000,
});

//Stack for generating test tiles
new TileGenerationStack(app, 'TestTileGenerationStack', {    
  env: env,
  instanceType: testInstanceType,
  volume: testEC2Volume,
  sharedMemorySize: 200,
  dockerEnv: testDockerEnv,
  memoryReservationMiB: 25000,
  schedule: event.Schedule.rate(Duration.minutes(1)),
});

const PlanetInstanceType = ec2.InstanceType.of(ec2.InstanceClass.X1E, ec2.InstanceSize.XLARGE8);

const PlanetEC2Volume = asc.BlockDeviceVolume.ebs(1500, {
  deleteOnTermination: true,
  volumeType: asc.EbsDeviceVolumeType.IO1,
  iops: 5000,
});

const planetDockerEnv = {
  'DOWNLOAD_PLANET':'enabled',
  'BBOX':'-180.0,-90.0,180.0,90.0',
  'OSM2PGSQL_EXTRA_ARGS':'-C 400000 --flat-nodes /nodes/flat_nodes.bin',
  'MIN_ZOOM':'0',
  'MAX_ZOOM':'10',
  'THREADS':'30',
  'PYTHONUNBUFFERED':'1',
  'AUTOVACUUM':'off',
};

//Stack for generating planet tiles
new TileGenerationStack(app, 'PlanetTileGenerationStack', {    
  env: env,
  instanceType: PlanetInstanceType,
  volume: PlanetEC2Volume,
  sharedMemorySize: 1000,
  dockerEnv: planetDockerEnv,
  memoryReservationMiB: 900000,
  schedule: event.Schedule.rate(Duration.minutes(1)),
});