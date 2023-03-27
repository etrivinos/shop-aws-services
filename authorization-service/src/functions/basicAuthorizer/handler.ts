import { areCredentialsValid } from "@utils/validation";
import { generateUserPolicy } from "@utils/policy";
import { getAuthCredentialsDecoded } from "@utils/auth";

const basicAuthorizer = async (event, _, callback) => {
  try {
    const credentials = getAuthCredentialsDecoded(event);
    const credentialsAreValid = credentials && areCredentialsValid(credentials);

    const policy = generateUserPolicy(event.methodArn, 'execute-api:Invoke', credentialsAreValid);
    callback(null, policy);
  }
  catch(error) {
    console.log(error);
    callback(error.code);
  }
};

export const main = basicAuthorizer;
