import type { AWS } from '@serverless/typescript';
import getProductsList from '@functions/getProductsList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-2',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: 'products',
      STOCKS_TABLE: 'stocks',
      CREATE_PRODUCT_TOPIC_ARN: 'arn:aws:sns:us-east-2:985895943642:createProductTopic'
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: "sns:Publish",
        Resource: "arn:aws:sns:us-east-2:985895943642:createProductTopic"
      },
      {
        Effect: "Allow",
        Action: [
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:PutItem"
        ],
        Resource: "arn:aws:dynamodb:us-east-2:985895943642:table/products"
      },
      {
        Effect: "Allow",
        Action: [
            "dynamodb:GetItem",
            "dynamodb:Scan",
            "dynamodb:PutItem"
        ],
        Resource: "arn:aws:dynamodb:us-east-2:985895943642:table/stocks"
      }
    ]
  },
  functions: { 
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess
  },
  resources: {
    Resources: {
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          DisplayName: "CreateProductTopic",
          TopicName: "createProductTopic",
        }
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "edwin.trivinos@hotmail.com",
          TopicArn: {
            "Ref": "SNSTopic"
          },
          FilterPolicyScope: 'MessageBody',
          FilterPolicy: {
            id: [
              "24d9d4e2-4912-47a1-8a05-6c77652f488b",
              "922cbb0f-facd-4664-8bc4-00994f239b66",
              "191e1afc-e3df-4378-9919-c80cf486783b"
            ]
          }
        }
      },
      SNSSubscription2: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Protocol: "email",
          Endpoint: "blackesh@gmail.com",
          TopicArn: {
            "Ref": "SNSTopic"
          },
          FilterPolicyScope: 'MessageBody',
          FilterPolicy: {
            id: [
              "b7443262-908b-4729-943e-75cb44cf15b3",
              "82b0646c-38e0-4308-b3f8-fcdeb529f230",
              "c2e75647-cbaa-4de7-afda-603a81b056e8"
            ]
          }
        }
      }
    }
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: true,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
