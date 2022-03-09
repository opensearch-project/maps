# Tiles generation pipeline with CDK

 This project in `tilesGenerationPipeline` folder helps to build a raster map tiles generaion pipeline on Amazon ECS in AWS CDK. The docker base image is come from https://github.com/Overv/openstreetmap-tile-server
.
#  Getting Started

## Prerequisites
Install AWS CLI and Node.js first.

## AWS Prerequisites
Have an AWS account and administrator permissions to this account. Use `aws configure` to set account and region.

## Update configuration/performance tunning
The tiles generation configuration could be updated at `cdk.ts`. For example, Users can custom tiles generation area, zoom leve, schedule generation, etc.

## Deploy test tile generation stack
It's highly recommended to test the tile generation process with light data before running whole planet.

* Replace `YourS3BucketName` to your bucket name to receive generated tiles. Confirm your S3 bucket name passed into CDK
```
#Pass S3 Bucket name to CDK.
cdk synth --context TILE_S3_BUCKET=YourS3BucketName TestTileGenerationStack
```
* Deploy stack
```
cdk deploy TestTileGenerationStack -c TILE_S3_BUCKET=YourS3BucketName
```

* Check test stack result
From AWS console to check ECS task status, after checking test ECS task finished exit with 0, disable the ECS task schedule and change ASG EC2 instance desiredCapacity to 0 to save resources.

## Deploy planet tile generation stack

* Replace `YourS3BucketName` to your bucket name to receive generated tiles. Confirm your S3 bucket name passed into CDK
```
#Pass S3 Bucket name to CDK.
cdk synth --context TILE_S3_BUCKET=YourS3BucketName PlanetTileGenerationStack
```
* Deploy stack
```
cdk deploy PlanetTileGenerationStack -c TILE_S3_BUCKET=YourS3BucketName
```

* Check planet stack result
From AWS console to check ECS task status, after checking test ECS task finished exit with 0, disable the ECS task schedule and change ASG EC2 instance desiredCapacity to 0 to save resources.


## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

