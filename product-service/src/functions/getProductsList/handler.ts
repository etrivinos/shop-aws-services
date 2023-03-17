import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { IProduct } from '@models/product.model';
import { getAllProductsWithStock } from '@utils/db.queries';
import { logRequest } from '@utils/utils';
import { products } from '@mocks/products.mock';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  logRequest(event);

  try {
    const allProductsWithStock: IProduct[] = products; // await getAllProductsWithStock();
    return HTTPMessage.success(allProductsWithStock);
  }
  catch(error) {
    return HTTPMessage.internalServerError(error);
  }
};

export const main = getProductsList;
