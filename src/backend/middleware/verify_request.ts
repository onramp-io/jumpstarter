import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../firebase/admin/admin';

interface Request extends NextApiRequest {
  user: any;
}

export const verify_request = (handler) => {
  return async (req: Request, res: NextApiResponse) => {
    const accessToken = req.headers['authorization'];
    let token: string = '';

    if (!accessToken) {
      return res.status(401).send('Access token is required');
    } else {
      token = accessToken.split(' ')[1];
    }
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      if (decoded) {
        req.user = decoded;
      }
    } catch (error) {
      return res.status(401).send('Invalid access token');
    }
    return handler(req, res);
  };
};