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
      case 'POST':
        const userData = await UserController.post(req);
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
        break;
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log(chalk.red.bold('ERROR: handler() in user/create.ts'), error);
    res.status(StatusCodes.UNAUTHORIZED).json({ error });
  }
};

export default verifyRequest(handler);
