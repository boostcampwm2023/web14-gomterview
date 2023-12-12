import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IDRIVE_CONFIG } from 'src/config/idrive.config';

let s3Client: S3Client; // 싱글톤으로 유지할 S3 Client 인스턴스

const getIdriveS3Client = (): S3Client => {
  if (!s3Client) {
    s3Client = new S3Client(IDRIVE_CONFIG);
  }
  return s3Client;
};

const getPutCommandObject = (key: string): PutObjectCommand =>
  new PutObjectCommand({ Bucket: 'videos', Key: key });

export async function getSignedUrlWithKey(key: string) {
  const s3 = getIdriveS3Client();
  const command = getPutCommandObject(key);
  const expiresIn = 10;

  return await getSignedUrl(s3, command, { expiresIn });
}
