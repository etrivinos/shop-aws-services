
import { copyS3Object, deleteS3Object, getJSONFromS3ObjectStream } from '@libs/s3';
import * as SQS from '@libs/sqs/sqs.send-message';
import { IProduct } from '@models/product.model';
import { HTTPMessage } from '@utils/http.message';
import { S3CreateEvent } from "aws-lambda";

const importFileParser = async (event: S3CreateEvent) => {
  const { bucket, object } = event.Records[0].s3;
  const products: IProduct[] = await getJSONFromS3ObjectStream(bucket.name, object.key);

  try {
    for await (const product of products) {
      const sqsMessage = JSON.stringify(product);
      await SQS.sendMessage(sqsMessage, process.env.SQS_CATALOG_ITEMS_QUEUE);
    }

    // Move object
    const [folder, name] = object.key.split("/");
    await copyS3Object(name, folder, 'parsed');
    await deleteS3Object(object.key);

    return HTTPMessage.success({ message: 'success' });
  }
  catch(error) {
    console.log(error);
    return HTTPMessage.internalServerError(error);
  }
};


export const main = importFileParser;
