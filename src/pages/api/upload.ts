import type { NextApiRequest, NextApiResponse } from 'next';
import { MethodNotAllowedError } from 'helpers/ErrorHandling/errors';
import UploadController from '@backend/controller/upload/upload';
import RequestMethod from '@backend/common/RequestMethod';
import chalk from 'chalk';
import { Success } from 'helpers/ErrorHandling/success';

import { Request, verifyRequest } from '@backend/middleware/verify_request';
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case RequestMethod.GET:
        const uploadConfig = await UploadController.create(req);
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
          uploadConfig,
        });
        break;
      default:
        throw new MethodNotAllowedError('Method not found');
    }
  } catch (error) {
    console.log(
      chalk.red.bold(error.name + '@api/upload.ts on Line 23'),
      error.message
    );
    res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default verifyRequest(handler);
