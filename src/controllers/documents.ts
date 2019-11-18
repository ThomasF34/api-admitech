import dotenv from 'dotenv';
dotenv.config();
import aws from 'aws-sdk';
import logger from '../helpers/logger';

aws.config.update({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
});

interface AwsUrlPair {
  signedUrl: string;
  key: string;
}

const S3_BUCKET = process.env.AWS_S3_BUCKET;

async function generateUploadSignedUrl(fileType: string, userId: number): Promise<AwsUrlPair> {
  const s3 = new aws.S3();
  const s3_key = `${userId}:::${new Date().toISOString()}`;
  const s3_complete_name = `${s3_key}.${fileType}`;

  const s3_params = {
    Bucket: S3_BUCKET,
    Key: s3_complete_name,
    Expires: 500,
    ContentType: fileType,
  };

  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? s3.getSignedUrlPromise('putObject', s3_params).then(signedUrl => { return { signedUrl: signedUrl, key: s3_complete_name }; }) : new Promise((res) => res({ signedUrl: 'not in test mode', key: '1234.pdf' }));
}

async function generateGetSignedUrl(key: string): Promise<string> {
  const s3 = new aws.S3();

  const s3_params = {
    Bucket: S3_BUCKET,
    Key: key,
    Expires: 60,
  };

  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? s3.getSignedUrlPromise('getObject', s3_params) : new Promise((res) => res(`link_to_access_to_${key}`));
}

async function deleteAttachment(key: string): Promise<string> {
  const s3 = new aws.S3();

  const s3_params: aws.S3.Types.DeleteObjectRequest = {
    Bucket: S3_BUCKET || '',
    Key: key,
  };

  return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? s3.deleteObject(s3_params).promise().then(() => 'Successfully Deleted') : new Promise((res) => res(`link_to_access_to_${key}`));
}

export = { generateGetSignedUrl, generateUploadSignedUrl, deleteAttachment };