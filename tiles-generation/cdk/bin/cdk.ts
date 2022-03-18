#!/usr/bin/env node

/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/*
 * The entrypoint of the CDK application.
 */

import { App } from 'aws-cdk-lib';
import { TileGenerationStack } from '../lib/tile-generation-stack'
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as asc from "aws-cdk-lib/aws-autoscaling";

const app = new App();

const env = {
  region: app.node.tryGetContext('region') || process.env.CDK_INTEG_REGION || process.env.CDK_DEFAULT_REGION,
  account: app.node.tryGetContext('account') || process.env.CDK_INTEG_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT
};

const testInstanceType = ec2.InstanceType.of(ec2.InstanceClass.MEMORY3, ec2.InstanceSize.XLARGE);

// Define volume size for test stack instance
const testEC2Volume = asc.BlockDeviceVolume.ebs(30, {
  deleteOnTermination: true,
  // https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSVolumeTypes.html
  volumeType: asc.EbsDeviceVolumeType.IO1,
  // The number of I/O operations per second (IOPS) to provision for the volume
  iops: 1000
});

//Define docker environment for test stack ecs task
const testDockerEnv = {
  // Bounding box defines the area that tiles will be generated, it's the area for luxembourg
  'BBOX':'5.654568,49.431689,6.574673,50.177945',
  // Maps raw data 
  'DOWNLOAD_PBF':'https://download.geofabrik.de/europe/luxembourg-latest.osm.pbf',
  // Configuration for OSM2OGSQL https://osm2pgsql.org/doc/manual.html
  'OSM2PGSQL_EXTRA_ARGS':'-C 10000',
  // Minimum zoom level for generation tiles
  'MIN_ZOOM':'0',
  // Maximum level for generation tiles
  'MAX_ZOOM':'10',
  // Threads for import and rendering tiles process.
  'THREADS':'8',
  // Make generate_tiles.py logs output to container log
  'PYTHONUNBUFFERED':'1',
  // The database use the autovacuum feature by default. This behavior can be changed with AUTOVACUUM environment variable
  'AUTOVACUUM':'off'
};

new TileGenerationStack(app, 'TestTileGenerationStack', {    
  env: env,
  instanceType: testInstanceType,
  volume: testEC2Volume,
  // The value for the size (in MiB) of the /dev/shm volume for container default 
  // Default limit 64MB is too low for container
  sharedMemorySize: 200,
  // Docker environment for test stack ecs task
  dockerEnv: testDockerEnv,
  // Memory reservation for the task.
  memoryReservationMiB: 25000,
});

const PlanetInstanceType = ec2.InstanceType.of(ec2.InstanceClass.X1E, ec2.InstanceSize.XLARGE8);

// For planet tile generation, the whole process maximum volume will reach to about 1300GB
const PlanetEC2Volume = asc.BlockDeviceVolume.ebs(1500, {
  deleteOnTermination: true,
  volumeType: asc.EbsDeviceVolumeType.IO1,
  iops: 5000
});

const planetDockerEnv = {
  // Enable DOWNLOAD_PLANET to download OSM PBF file from public S3 bucket
  'DOWNLOAD_PLANET':'enabled',
  // Bounding box for whole planet
  'BBOX':'-180.0,-90.0,180.0,90.0',
  // Configuration for OSM2OGSQL https://osm2pgsql.org/doc/manual.html
  'OSM2PGSQL_EXTRA_ARGS':'-C 400000 --flat-nodes /nodes/flat_nodes.bin',
  'MIN_ZOOM':'0',
  'MAX_ZOOM':'10',
  'THREADS':'30',
  'PYTHONUNBUFFERED':'1',
  'AUTOVACUUM':'off',
};

// Stack for generating planet tiles
new TileGenerationStack(app, 'PlanetTileGenerationStack', {    
  env: env,
  instanceType: PlanetInstanceType,
  volume: PlanetEC2Volume,
  sharedMemorySize: 1000,
  dockerEnv: planetDockerEnv,
  memoryReservationMiB: 900000
});