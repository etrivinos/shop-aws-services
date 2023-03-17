import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { insertProduct } from '@utils/db.queries';
import { IProduct } from '@models/product.model';
import { randomUUID } from 'crypto';
import { logRequest } from '@utils/utils';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  logRequest(event);

  try {
    const product: IProduct = JSON.parse(event.body as any);
    product.id = randomUUID();
    // await insertProduct(product);
    return HTTPMessage.success(product);
  }
  catch(error) {
    return HTTPMessage.internalServerError(error);
  }
  
};

export const main = createProduct;
