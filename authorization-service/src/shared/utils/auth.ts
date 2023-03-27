import { ICredential } from "@models/credential.model";

export const getAuthCredentialsDecoded = (event): ICredential => {
  const { headers: { Authorization } } = event;
  return decodeBasicAuthorizacionCredentialsHeader(Authorization);
}

export const decodeBasicAuthorizacionCredentialsHeader = (basicAuthorizationCredentialsHeader: string): ICredential => {
  const [type, encodedCredentials] = basicAuthorizationCredentialsHeader.split(" ");

  if(type === 'Basic' && encodedCredentials) {
    const buffer = Buffer.from(encodedCredentials, "base64");
    const credentials = buffer.toString("utf-8").split(":");

    if(credentials.length === 2) {
      return {
        username: credentials[0],
        password: credentials[1]
      };
    }
  }

  return null;
}
  