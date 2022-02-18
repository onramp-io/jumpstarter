/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    DB_TYPE: process.env.DB_TYPE,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    FB_CLIENT_API_KEY: process.env.FB_CLIENT_API_KEY,
    FB_CLIENT_AUTH_DOMAIN: process.env.FB_CLIENT_AUTH_DOMAIN,
    FB_CLIENT_PROJECT_ID: process.env.FB_CLIENT_PROJECT_ID,
    FB_CLIENT_STORAGE_BUCKET: process.env.FB_CLIENT_STORAGE_BUCKET,
    FB_CLIENT_MESSAGING_SENDER_ID: process.env.FB_CLIENT_MESSAGING_SENDER_ID,
    FB_CLIENT_APP_ID: process.env.FB_CLIENT_APP_ID,
    FB_ADMIN_PROJECT_ID: process.env.FB_ADMIN_PROJECT_ID,
    FB_ADMIN_PRIVATE_KEY_ID: process.env.FB_ADMIN_PRIVATE_KEY_ID,
    FB_ADMIN_PRIVATE_KEY: process.env.FB_ADMIN_PRIVATE_KEY,
    FB_ADMIN_CLIENT_EMAIL: process.env.FB_ADMIN_CLIENT_EMAIL,
    FB_ADMIN_CLIENT_ID: process.env.FB_ADMIN_CLIENT_ID,
  },
  images: {
    domains: ['images.unsplash.com']
  },
  future: {
    webpack5: true,
  },
};
