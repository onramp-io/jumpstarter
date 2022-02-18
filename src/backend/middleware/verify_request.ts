import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '../../firebase/admin/admin';

export interface Request extends NextApiRequest {
  user: any;
}

export const verify_request = (handler) => {
  return async (req: Request, res: NextApiResponse) => {
    const accessToken = req.headers['authorization'];
    let token: string = '';

    if (!accessToken) {
      console.log('ERROR: verify_request() in verify_request.ts');
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
      console.log('ERROR: verify_request() #2 in verify_request.ts');
      return res.status(401).send('Invalid access token');
    }
    return handler(req, res);
  };
};
