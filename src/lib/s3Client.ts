import { S3Client } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  forcePathStyle: false,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
});

export default s3Client;
