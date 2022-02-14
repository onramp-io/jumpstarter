import { CognitoUserPool } from 'amazon-cognito-identity-js';

const user_pool_config = {
  UserPoolId: process.env.COGNITO_POOL_ID as string,
  ClientId: process.env.COGNITO_CLIENT_ID as string,
};

export default new CognitoUserPool(user_pool_config);
