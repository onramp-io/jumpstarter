import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { InvestmentController } from '@backend/controller/investment/investment';

import chalk from 'chalk';
import {
  DatabaseError,
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
      case 'GET':
        const userInvestments = await InvestmentController.getAll(req);
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
          userInvestments,
        });
        break;
      default:
        throw new MethodNotAllowedError('Method not found');
    }
  } catch (error) {
    console.log(
      chalk.red.bold(error.name + '@investments/get.ts on Line 32'),
      error.message
    );
    res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default verifyRequest(handler);
