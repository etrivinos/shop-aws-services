import { randomUUID } from "crypto";

export enum EFFECT_TYPE {
  DENY = 'Deny',
  ALLOW = 'Allow'
}

export const generateUserPolicy = (
  resource: string, 
  action: string, 
  allow = false,
  principalId = null, 
  version = '2012-10-17'
) => {
  const effect = allow ? EFFECT_TYPE.ALLOW: EFFECT_TYPE.DENY;

  return {
    principalId: principalId ?? randomUUID(),
    policyDocument: {
      Version: version,
      Statement: [
        {
          Resource: resource,
          Effect: effect,
          Action: action
        },
      ],
    },
  };
};
