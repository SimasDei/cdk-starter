#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { PhotosStack } from '../lib/photos-stack';
// import { CdkStarterStack } from '../lib/cdk-starter-stack';

const app = new cdk.App();
// new CdkStarterStack(app, 'CdkStarterStack');
new PhotosStack(app, 'PhotosStack');
