export class HTTPError {
    static notFound = (resource = 'Resource') => {
      return {
        statusCode: 404,
        body: `${resource} Not Found`
      };
    }
}
