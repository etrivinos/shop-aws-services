import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand, S3, CopyObjectCommandInput, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { parse } from 'csv-parse';
import { Stream } from "stream";

const s3 = new S3({ region: 'us-east-2' });
const s3Client = new S3Client({ region: 'us-east-2' });

export const getPutSignedURL = async (bucket: string, key: string, contentType = 'text/csv', expires: number = 600) => {
  const getObjectParams = {
    Bucket: bucket,
    Key: key,
    ContentType: contentType
  };

  const command = new PutObjectCommand(getObjectParams);
  return await getSignedUrl(s3Client, command, { expiresIn: expires });
}

export const getS3ObjectStream = async (bucket: string, key: string): Promise<Stream> => {
  const s3Object = await s3.getObject({ Bucket: bucket, Key: key });
  return s3Object.Body as Stream;
}

export const copyS3Object = async (key: string, origin: string, destination: string) => {
  const command: CopyObjectCommandInput = {
    Bucket: process.env.S3_BUCKET,
    Key: `${destination}/${key}`,
    CopySource: `${process.env.S3_BUCKET}/${origin}/${key}`,
  };
  
  const input = new CopyObjectCommand(command);
  return await s3Client.send(input);
}

export const deleteS3Object = async (key: string) => {
  const command = {
    Bucket: process.env.S3_BUCKET,
    Key: key,
  };

  const input = new DeleteObjectCommand(command);
  return await s3Client.send(input);
}

export const getJSONFromS3ObjectStream = async (bucket: string, key: string) => {
  const stream = (await getS3ObjectStream(bucket, key)).pipe(parse());
  let items = [];
  let titles = [];

  let index = 0;
  for await (const chunk of stream) {
    if(!index) {
      chunk.forEach((value: string) => titles.push(value));
    }
    else {
      let line = {};
      chunk.forEach((value: string, index: number) => line[titles[index]] = value);
      items.push(line);
    }

    index++;
  }

  return items;
}
