const config = {
  firebaseConfig: {
    apiKey: process.env.FB_CLIENT_API_KEY,
    authDomain: process.env.FB_CLIENT_AUTH_DOMAIN,
    projectId: process.env.FB_CLIENT_PROJECT_ID,
    storageBucket: process.env.FB_CLIENT_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_CLIENT_MESSAGING_SENDER_ID,
    appId: process.env.FB_CLIENT_APP_ID,
  },
};

export default config;
