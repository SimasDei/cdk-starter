import * as cdk from 'aws-cdk-lib';
import { CfnOutput, Fn } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class PhotosStack extends cdk.Stack {
  private stackSuffix: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.initializeStackSuffix();

    const photosBucket = new Bucket(this, 'PhotosBucket', {
      bucketName: `photos-${this.stackSuffix}`,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new CfnOutput(this, 'photos-bucket', {
      value: photosBucket.bucketArn,
      exportName: 'photos-bucket',
    });
  }

  private initializeStackSuffix() {
    const shortStackId = Fn.select(2, cdk.Fn.split('/', this.stackId));
    this.stackSuffix = Fn.select(4, Fn.split('-', shortStackId));
  }
}
