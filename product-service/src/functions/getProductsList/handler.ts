import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import mockProductList from '@mocks/products.mock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify(mockProductList)
  }
};

export const main = getProductsList;
