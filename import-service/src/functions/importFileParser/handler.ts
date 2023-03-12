
import { copyS3Object, deleteS3Object, getS3ObjectStream } from '@libs/s3';
import { HTTPMessage } from '@utils/http.message';
import { S3CreateEvent } from "aws-lambda";

const importFileParser = async (event: S3CreateEvent) => {
  const { bucket, object } = event.Records[0].s3;
  await getS3ObjectStream(bucket.name, object.key);

  const [folder, name] = object.key.split("/");
  await copyS3Object(name, folder, 'parsed');
  await deleteS3Object(object.key);

  HTTPMessage.success({ message: 'success' });
};

export const main = importFileParser;
