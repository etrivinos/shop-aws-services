// Import required AWS SDK clients and commands for Node.js
import { SendMessageCommand, SendMessageCommandInput } from  "@aws-sdk/client-sqs";
import { sqsClient } from "./sqs.client";

export const sendMessage = async (message: string, sqsQueueURL: string): Promise<any> => {
  try {
    const params: SendMessageCommandInput = {
      MessageBody: message,
      QueueUrl: sqsQueueURL
    };

    const data = await sqsClient.send(new SendMessageCommand(params));
    return data.MessageId;
  } catch (err) {
    throw err;
  }
}
