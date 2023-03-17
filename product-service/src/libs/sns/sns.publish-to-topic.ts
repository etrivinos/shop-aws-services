import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./sns.client";

export const publishToTopic = async (message: string, topicARN: string): Promise<any> => {
  try {
    const params = {
      Message: message,
      TopicArn: topicARN
    };

    await snsClient.send(new PublishCommand(params));
  } catch (err) {
    console.log("Error", err);
    throw err;
  }
}
