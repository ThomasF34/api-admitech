import dotenv from 'dotenv';
dotenv.config();
import aws from 'aws-sdk';

aws.config.update({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
});

interface AwsUrlPair {
  signedUrl: string;
  url: string;
}

const S3_BUCKET = process.env.AWS_S3_BUCKET;

async function generateSignedUrl(fileName: string, fileType: string): Promise<AwsUrlPair> {
  const s3 = new aws.S3();
  //TODO CORRECT hash
  const s3_key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const s3_complete_name = `${s3_key}.${fileType}`;

  const s3_params = {
    Bucket: S3_BUCKET,
    Key: s3_complete_name,
    Expires: 500,
    ContentType: fileType,
  };

  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? s3.getSignedUrlPromise('putObject', s3_params).then(signedUrl => { return { signedUrl: signedUrl, url: `https://${S3_BUCKET}.s3.amazonaws.com/${s3_complete_name}` }; }) : new Promise((res) => res({ signedUrl: 'not in test mode', url: 'www.google.fr' }));
}

export = { generateSignedUrl };