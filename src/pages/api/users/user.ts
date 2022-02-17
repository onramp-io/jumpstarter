import { verify_request } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  get_user_controller,
  post_user_controller,
  put_user_controller,
  delete_user_controller,
} from '../../../backend/controller/user/user';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    const user = req.user;
    if (req.method === 'GET') {
      get_user_controller(req, res, user); // (edit.tsx, user.tsx)
    } else if (req.method === 'POST') {
      post_user_controller(req, res, user); // (signup.tsx)
    } else if (req.method === 'PUT') {
      put_user_controller(req, res, user); // (edit.tsx)
    } else {
      delete_user_controller(req, res, user); // (edit.tsx)
      console.log(req.body);
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default verify_request(handler);
