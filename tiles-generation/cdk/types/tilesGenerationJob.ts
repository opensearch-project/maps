import { Environment } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as asc from 'aws-cdk-lib/aws-autoscaling';

export type tilesGenerationJob = {
    id: string;
    isProd: boolean;
    props: {
        env: Environment;
        instanceType: ec2.InstanceType;
        volume: asc.BlockDeviceVolume;
        sharedMemorySize: number;
        dockerEnv: { [key: string]: string };
        memoryReservationMiB: number;
        containerImage: string;
        containerCommand: string;
    };
};
