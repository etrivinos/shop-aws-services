import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { getPutSignedURL } from '@libs/s3';
import { HTTPMessage } from '@utils/http.message';
import { logRequest } from '@utils/utils';
import schema from './schema';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  logRequest(event);

  try {
    const { name } = event.queryStringParameters;
    const signKey = `${process.env.S3_KEY_PRODUCTS}/${name}`;
    const signedURL = await getPutSignedURL(process.env.S3_BUCKET, signKey);

    return HTTPMessage.success({ signedURL });
  }
  catch(error) {
    return HTTPMessage.internalServerError(error);
  }
};

export const main = importProductsFile;
