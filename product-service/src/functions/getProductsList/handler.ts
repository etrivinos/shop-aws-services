import { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';

import schema from './schema';
import { products } from '@mocks/products.mock';
import { HTTPMessage } from '@utils/http.message';
import { IRecord } from '@models/general.model';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  return HTTPMessage.success(products as IRecord[]);
};

export const main = getProductsList;
