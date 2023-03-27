import { ICredential } from "@models/credential.model";

export const isAuthorizationHeaderPresent = (event): boolean => {
  const { headers } = event;
  return !!(headers?.Authorization);
}

export const areCredentialsValid = (credentials: ICredential): boolean => {
  const envPassword = process.env[credentials.username];
  return envPassword === credentials.password;
}
