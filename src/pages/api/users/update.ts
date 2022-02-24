import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserController } from '../../../backend/controller/user/user';

import chalk from 'chalk';
import {
  MethodNotAllowedError,
  NotFoundError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'PUT':
        await UserController.put(req);
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
          data: {},
        });
        break;
      default:
        throw new MethodNotAllowedError('Method not found');
    }
  } catch (error) {
    if (error instanceof NotFoundError) {
      console.log(
        chalk.red.bold(error.name + '@user/update.ts on Line 32'),
        error.message
      );
    } else if (error instanceof MethodNotAllowedError) {
      console.log(
        chalk.red.bold(error.name + '@user/update.ts on Line 37'),
        error.message
      );
      res.status(error.code).json({
        status: error.status,
        message: error.message,
      });
    }
  }
};

export default verifyRequest(handler);
