import { publishToTopic } from '@libs/sns/sns.publish-to-topic';
import { IProduct } from '@models/product.model';
import { insertProduct } from '@utils/db.queries';
import { HTTPMessage } from '@utils/http.message';
import { SQSEvent } from 'aws-lambda';

const catalogBatchProcess = async (event: SQSEvent) => {
  try {
    let products: Array<IProduct> = [];

    for(const record of event.Records) {
      const product: IProduct = JSON.parse(record.body);
      products.push(product);

      // await insertProduct(product);
      await publishToTopic(JSON.stringify(product), process.env.CREATE_PRODUCT_TOPIC_ARN);
    }

    return HTTPMessage.success({ message: 'ok' });
  }
  catch (error) {
    console.log(error);
    return HTTPMessage.internalServerError(error);
  }
};

export const main = catalogBatchProcess;
