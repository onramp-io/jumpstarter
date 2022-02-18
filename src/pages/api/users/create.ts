import { verify_request } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { post_user_controller } from '../../../backend/controller/user/user';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'POST':
        post_user_controller(req, res);
        break;
      default:
        res.status(404).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log('ERROR: handler() in user.ts', error);
    res.status(401).json({ error });
  }
};

export default verify_request(handler);
