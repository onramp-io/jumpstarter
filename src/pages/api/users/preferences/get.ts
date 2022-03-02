import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserController } from '../../../../backend/controller/user/user';

import chalk from 'chalk';
import {
  DatabaseError,
  MethodNotAllowedError,
  NotFoundError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';

import { Request } from '../../../../backend/middleware/verify_request';

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const categories = await UserController.getCategories();
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
          categories,
        });
        break;
      default:
        throw new MethodNotAllowedError('Method not found');
    }
  } catch (error) {
    console.log(
      chalk.red.bold(
        'ERROR: ',
        error.name + '@users/preferences/get.ts on Line 32'
      ),
      error.message
    );
    res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default verifyRequest(handler);
