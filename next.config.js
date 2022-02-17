/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    COGNITO_POOL_ID: process.env.COGNITO_POOL_ID,
    COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    domains: ['images.unsplash.com']
  },
  future: {
    webpack5: true,
  },
};
