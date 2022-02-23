import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserController } from '../../../backend/controller/user/user';

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'DELETE':
        const userData = await UserController.delete(req);
        if (userData) {
          res.status(StatusCodes.OK).json({
            message: 'User deleted',
          });
        } else {
          res.status(StatusCodes.NOT_FOUND).json({
            message: 'User not deleted',
          });
        }
        break;
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log('ERROR: handler() in delete.ts', error);
    res.status(401).json({ error });
  }
};

export default verifyRequest(handler);
