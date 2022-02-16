import type { NextApiRequest, NextApiResponse } from 'next';
import user_controller from '../../backend/controller/user/user';

import Amplify, { withSSRContext } from 'aws-amplify';
import awsExports from '../../aws-exports.js';

// Amplify SSR configuration needs to be enabled within each API route
Amplify.configure({ ...awsExports, ssr: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { Auth } = withSSRContext({ req });
  try {
    const user = await Auth.currentAuthenticatedUser();
    if (req.method === 'GET') {
      // go to the get routes file import it from routes/get.ts
      //Basic ping/pong endpoint to test server functionality
      user_controller(req, res, user);
    } else {
      console.log(req.body);
      // Handle any other HTTP method
    }
  } catch (error) {
    res.status(401).json({ error });
  }
}
