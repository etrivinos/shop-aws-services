import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { HTTPMessage } from '@utils/http.message';
import { IProductWithStock } from '@models/product.model';
import { getAllProductsWithStock } from '@utils/db.queries';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const products: IProductWithStock[] = await getAllProductsWithStock();
  return HTTPMessage.success(products);
};

export const main = getProductsList;
