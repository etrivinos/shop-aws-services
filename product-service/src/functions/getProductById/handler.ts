import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { products } from '@mocks/products.mock';
import { HTTPMessage } from '@utils/http.message';
import { IRecord } from '@models/general.model';
import { IProduct } from '@models/product.model';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const product = filterProductById(event.pathParameters.productId);  

  return product ? 
    HTTPMessage.success(product as IRecord) : 
    HTTPMessage.notFound('Product');
};

function filterProductById(productId: string): IProduct {
  return products.filter(product => product.id === +productId)[0];
}

export const main = getProductById;
