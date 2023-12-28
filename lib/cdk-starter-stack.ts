import * as cdk from 'aws-cdk-lib';
import { Bucket, CfnBucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration?: cdk.Duration) {
    super(scope, id);

    new Bucket(this, id, {
      lifecycleRules: [
        {
          expiration: expiration ?? cdk.Duration.days(2),
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

    new Bucket(this, 'MyL2Bucket', {
      lifecycleRules: [
        {
          expiration: cdk.Duration.days(2),
        },
      ],
    });

    new L3Bucket(this, 'MyL3Bucket', cdk.Duration.days(2));
  }
}
