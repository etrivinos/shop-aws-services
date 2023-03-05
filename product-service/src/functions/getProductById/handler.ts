import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { getProductWithStock } from '@utils/db.queries';
import { logRequest } from '@utils/utils';

const getProductById: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  logRequest(event);

  try {
    const productWithStock = await getProductWithStock(event.pathParameters.productId);
    
    return productWithStock ?
      HTTPMessage.success(productWithStock) :
      HTTPMessage.notFound('Product');
  }
  catch(error) {
    return HTTPMessage.internalServerError(error);
  }
};

export const main = getProductById;
