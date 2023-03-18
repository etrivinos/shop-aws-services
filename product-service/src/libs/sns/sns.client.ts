import  { SNSClient } from "@aws-sdk/client-sns";
const snsClient = new SNSClient({ region: 'us-east-2' });
export  { snsClient };