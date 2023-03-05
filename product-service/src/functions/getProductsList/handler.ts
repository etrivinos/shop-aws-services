import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { IProduct } from '@models/product.model';
import { getAllProductsWithStock } from '@utils/db.queries';
import { logRequest } from '@utils/utils';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  logRequest(event);

  try {
    const products: IProduct[] = await getAllProductsWithStock();
    return HTTPMessage.success(products);
  }
  catch(error) {
    return HTTPMessage.internalServerError(error);
  }
};

export const main = getProductsList;
