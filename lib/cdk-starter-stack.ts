import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration?: number) {
    super(scope, id);

    new Bucket(this, id, {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(expiration ?? 2),
        },
      ],
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CfnBucket(this, 'MyL1Bucket', {
      lifecycleConfiguration: {
        rules: [
          {
            expirationInDays: 2,
            status: 'Enabled',
          },
        ],
      },
    });

    const durationParameter = new cdk.CfnParameter(this, 'MyL2BucketExpiration', {
      type: 'Number',
      default: 2,
      minValue: 1,
      maxValue: 10,
    });

    const myL2Bucket = new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(durationParameter.valueAsNumber),
        },
      ],
    });

    new L3Bucket(this, 'MyL3Bucket', durationParameter.valueAsNumber);

    new cdk.CfnOutput(this, 'MyL2BucketName', {
      value: myL2Bucket.bucketName,
    });
  }
}
