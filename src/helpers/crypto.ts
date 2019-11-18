import dotenv from 'dotenv';
import Crypto from 'crypto-js';
import logger from './logger';
dotenv.config();

const separator = ':::';

interface DecryptedAttachmentKey {
  user_id: number;
  date: Date;
}

function encrypt(key: DecryptedAttachmentKey): string {
  const encryptionKey = process.env.AWS_ATTACHMENT_KEY || 'no_key';
  logger.info(`Encrypting AWS S3 key ${encryptionKey}`);
  return Crypto.AES.encrypt(`${key.user_id}${separator}${key.date.toString()}`, encryptionKey).toString();
}

function decrypt(key: string): DecryptedAttachmentKey | undefined {
  const encryptionKey = process.env.AWS_ATTACHMENT_KEY || 'no_key';
  const decrypted = Crypto.AES.decrypt(key, encryptionKey).toString(Crypto.enc.Utf8);
  const array = decrypted.split(separator);
  if (array.length !== 2) logger.error(['Error while decrypting AWS S3 file key', key, decrypted, array]);
  else return { user_id: parseInt(array[0]), date: new Date(array[1]) };
}


export { encrypt, decrypt };