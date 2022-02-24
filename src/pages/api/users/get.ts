import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserController } from '../../../backend/controller/user/user';

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

import chalk from 'chalk';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const userData = await UserController.get(req);
        res.status(StatusCodes.OK).json({
          message: 'User found',
          userData,
        });
        break;
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log(chalk.red.bold('ERROR: handler() in user/get.ts'), error);
    res.status(StatusCodes.UNAUTHORIZED).json({ error });
  }
};

export default verifyRequest(handler);
