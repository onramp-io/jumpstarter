/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    CONNECTION_STRING: process.env.CONNECTION_STRING
  },
};
