import { IRecord } from "@models/general.model";

export class HTTPMessage {
    static notFound = (resource = 'Resource') => {
      return HTTPMessage.addHeaders({
        statusCode: 404,
        body: `${resource} Not Found`,
      });
    }

    static internalServerError = (error: Error) => {
      return HTTPMessage.addHeaders({
        statusCode: 505,
        body: `Internal Server Error. ${error.message}`,
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
