
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: process.env.REGION || 'us-east-2' });
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export const saveItemsToDynamoDB = async (items) => {
  for(const item of items) {
    const command = new PutCommand({ TableName: process.env.TABLE_NAME, Item: item });
    await dynamoDBDocumentClient.send(command);
  }
}
