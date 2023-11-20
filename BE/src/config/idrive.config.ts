import * as AWS from 'aws-sdk';
import 'dotenv/config';

export const IDRIVE_CONFIG = {
  endpoint: new AWS.Endpoint(process.env.IDRIVE_ENDPOINT),
  region: 'e2',
  credentials: {
    accessKeyId: process.env.IDRIVE_ACCESS_KEY_ID,
    secretAccessKey: process.env.IDRIVE_SECRET_ACCESS_KEY,
  },
  signatureVersion: 's3v4',
};
