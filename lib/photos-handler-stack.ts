import * as cdk from 'aws-cdk-lib';
import { Fn } from 'aws-cdk-lib';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

interface PhotosHandlerStackProps extends cdk.StackProps {
  targetBucketArn: string;
}

export class PhotosHandlerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: PhotosHandlerStackProps) {
    super(scope, id, props);

    new LambdaFunction(this, 'PhotosHandler', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: Code.fromInline(`
        exports.handler = async (event) => {
          console.log(JSON.stringify(event, null, 2));
          console.log('targetBucket from env: ' + process.env.TARGET_BUCKET);
          return {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
          };
        };
      `),
      environment: {
        TARGET_BUCKET: required<string>(props.targetBucketArn),
      },
    });
  }
}

export function required<T>(value: T) {
  if (value === undefined || value === null) {
    throw new Error('Required value');
  }
  return value;
}
