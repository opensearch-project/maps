# Tiles generation pipeline with CDK

This project helps to build raster tiles and vector tiles generation pipeline on [Amazon ECS](https://aws.amazon.com/ecs/) using [AWS CDK](https://aws.amazon.com/cdk/). The raster tiles generation docker base image comes from the [openstreetmap-tile-server](https://github.com/Overv/openstreetmap-tile-server) project. The vector tiles generation leverage [Planetiler](https://github.com/onthegomap/planetiler) to generate tiles into MBTiles(SQLite) and then leverage [MBUtil](https://github.com/mapbox/mbutil) to extract it to PBF(Google Protobufs) files.

## Diagram
![alt text](./tiles-generation-diagram.png)

Step1: Deploy CDK stack, prepare AWS resources, it will:
* Build and upload docker image to ECR
* Create ECS autoscaling provider and initialized with 0 EC2 instance
* Create ECS task definition

Step2: Execute ECS tiles task by run-task command, it will:
* Request new EC2 instance and volume created from autoscaling provider
* Start running task work
* Tiles images set with version controlled name will be uploaded to S3 bucket
* Once task finished, EC2 instance and volumes will be destroyed by autoscaling provider 

## Get started
### Prerequisites
* Install Node.js
Visit [here](https://nodejs.org/en/) to install Node.js

* Install AWS CDK Toolkit
```
npm install -g aws-cdk
```

* Install AWS CLI
Visit [here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) to install AWS CLI
* Visit [here](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html#getting_started_prerequisites) to configure aws credentials

### CDK Deployment

1. (Optional)The tiles generation configuration could be customized at `cdk.ts`. For example, Users can customize tiles generation area, zoom level etc.


2. Prepare context values for CDK deploy, [here](https://docs.aws.amazon.com/cdk/v2/guide/context.html#context_construct) to learn how to provide CDK runtime context. For this guidance, we choose to provide the context values in `cdk.context.json` file.
```
{
    "BUCKET":"s3BucketName",
    "EMAIL":"emailAddress",
    "SLACK":"slackWebHookURL"
} 
```
* `BUCKET` - the S3 bucket to store generated tiles. This bucket must be in the same aws account.
* `EMAIL` - optional, the email to receive Notification for ECS task status change.
* `SLACK` - optional, the slack Webhook url to send notification to Slack channel.

3. Deploy CDK stacks, all AWS resources defined within the scope of a stack.

- Test tile generation stack, it's used to test with light data for development and tuning performance. Since planet tiles generation task will take days, when you want to update the code source, it's recommended to test first with the tile generation test stack.

  - Test raster tiles
    - `cdk deploy TestVectorTileGeneration`
  - Test vector tiles
    - `cdk deploy TestRasterTileGeneration`

* Planet tile generation stack, currently we are using OSM planet data from [OpenStreetMap on AWS](https://registry.opendata.aws/osm/), the ECS task will download the latest PBF file from there.
  - Planet raster tiles
    - `cdk deploy PlanetRasterTileGeneration`
  - Planet vector tiles
    - `cdk deploy PlanetVectorTileGeneration`

* (Optional) If you want to get notifications of the tiles generation ECS task state changes, you can optionally deploy the below stacks. It allows you get Slack notification and email notification. You will need to update the context values of EMAIL, SLACK in `cdk.context.json` file before deploy these stacks. When creating Slack webhooks, you need set a `Content` variable for the webhook. Learn  how to [get Slack webhook URL](https://slack.com/help/articles/360041352714-Create-more-advanced-workflows-using-webhooks).

```
cdk deploy EmailSNSPlanetRasterTileGeneration
cdk deploy EmailSNSPlanetVectorTileGeneration
cdk deploy EmailSNSTestRasterTileGeneration
cdk deploy EmailSNSTestVectorTileGeneration
cdk deploy SlackSNSPlanetRasterTileGeneration
cdk deploy SlackSNSPlanetVectorTileGeneration
cdk deploy SlackSNSTestRasterTileGeneration
cdk deploy SlackSNSTestVectorTileGeneration
```

### Execute ECS task

1. Once stacks deployed, note the `ClusterName`, `TaskDefinitionArn`, `CapacityProviderName` from the output of the command. Use them on the below command.

```
aws ecs run-task --cluster ClusterName --task-definition TaskDefinitionArn --capacity-provider-strategy capacityProvider=CapacityProviderName
```

2. Check result. On AWS management console, you can check ECS task logs, after ECS test task exited with 0, the maps tiles will be uploaded to S3 bucket.

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk destroy`     destroy the stack
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
