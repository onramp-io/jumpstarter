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
    switch(req.method) {
      case 'GET': //user_controller(req, res, user);
      default: console.log(req.body);
    }
  } catch (error) {
    res.status(401).json({ error });
  }
}
