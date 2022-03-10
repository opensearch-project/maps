# Tiles generation pipeline with CDK

 This project in `tilesGenerationPipeline` folder helps to build a raster map tiles generaion pipeline on Amazon ECS in AWS CDK. The docker base image is come from https://github.com/Overv/openstreetmap-tile-server.

## Diagram
![alt text](./tiles-generation-diagram.png).

#  Getting Started
## Prerequisites

### Install Node.js

Visit https://nodejs.org/en/ to install Node.js
### Install AWS CDK Toolkit

```
npm install -g aws-cdk
```
### AWS Prerequisites
Configure [aws credentials](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_prerequisites)
## Deployment

### Deploy steps

1. (Optional)The tiles generation configuration could be customized at `cdk.ts`. For example, Users can customize tiles generation area, zoom level, schedule generation, etc.


2. The context of `TILE_S3_BUCKET` are required in CDK deployment - The name of the S3 bucket you will use to deploy. This bucket must be in the same aws account. This bucket is used to store generated tiles.

3. Deploy stacks

* For test tile generation stack, If you will need cutomize configuration or update the stack, It's recommended to deploy the light data tile generation stack for test before deploy planet tile generation stack.
```
cdk deploy TestTileGenerationStack --context TILE_S3_BUCKET=YourS3BucketName
```

* For planet tile generation stack
```
cdk deploy PlanetTileGenerationStack --context TILE_S3_BUCKET=YourS3BucketName
```
4. Check stack result

* From AWS console to check ECS task status, after checking test ECS task finished exit with 0, disable the ECS task schedule and change ASG EC2 instance desiredCapacity to 0 to save resources.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

