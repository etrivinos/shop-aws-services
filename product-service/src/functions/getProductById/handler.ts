import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import mockProductList from '@mocks/products.mock';
import { HTTPError } from 'src/shared/utils/http.error';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productId = event.pathParameters?.productId;
  const product = mockProductList[+productId - 1];

  if(!product) {
    return HTTPError.notFound('Product');
  }

  return {
    statusCode: 200,
    body: JSON.stringify(product)
  }
};

export const main = getProductById;
