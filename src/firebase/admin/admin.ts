const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FB_ADMIN_PROJECT_ID,
      private_key_id: process.env.FB_ADMIN_PRIVATE_KEY_ID,
      private_key: process.env.FB_ADMIN_PRIVATE_KEY,
      client_email: process.env.FB_ADMIN_CLIENT_EMAIL,
      client_id: process.env.FB_ADMIN_CLIENT_ID,
    }),
  });
}

export default admin;
