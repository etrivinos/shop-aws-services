import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: 'us-east-2' });
const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

/**
 * 
 * @param table 
 * @returns 
 */
export const getAllItems = async <T>(table: string): Promise<T> => {
  const input = { TableName: table };
  const command = new ScanCommand(input);

  const response = await dynamoDBDocumentClient.send(command);
  return <T>response.Items;
}

export const getItemById = async <T>(table: string, key: Record<string, any>): Promise<T> => {
  const input = { TableName: table, Key: key };

  const command = new GetCommand(input);
  const response = await dynamoDBDocumentClient.send(command);
  return <T>response.Item;
}