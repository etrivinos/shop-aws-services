import  { SQSClient } from "@aws-sdk/client-sqs";
const sqsClient = new SQSClient({ region: "us-east-2" });
export  { sqsClient }