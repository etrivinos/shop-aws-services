import { IRecord } from "@models/general.model";

export class HTTPMessage {
    static notFound = (resource = 'Resource') => {
      return HTTPMessage.addHeaders({
        statusCode: 404,
        body: `${resource} Not Found`,
      });
    }

    static success = (response: IRecord) => {
      return HTTPMessage.addHeaders({
          statusCode: 200,
          body: JSON.stringify(response)
        });
    }

    static addHeaders = (response) => {
      return {
        ...response,
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }
    }
}
