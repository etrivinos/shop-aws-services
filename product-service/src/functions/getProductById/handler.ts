import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { getProductWithStock } from '@utils/db.queries';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const productWithStock = await getProductWithStock(event.pathParameters.productId);

  return productWithStock ?
    HTTPMessage.success(productWithStock) :
    HTTPMessage.notFound('Product');
};

export const main = getProductById;
