import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true
            },
          },
        },
        authorizer: {
          arn: 'arn:aws:lambda:us-east-2:985895943642:function:authorization-service-dev-basicAuthorizer',
          resultTtlInSeconds: 0,
          identitySource: 'method.request.header.Authorization',
          type: 'request'
        }
      },
    },
  ],
};
