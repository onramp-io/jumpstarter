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
    let user = req.user;
    switch (req.method) {
      case 'GET':
        get_user_controller(req, res, user);
      case 'POST':
        post_user_controller(req, res, user);
      case 'PUT':
        put_user_controller(req, res, user);
      case 'DELETE':
        delete_user_controller(req, res, user);
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

export default verify_request(handler);
