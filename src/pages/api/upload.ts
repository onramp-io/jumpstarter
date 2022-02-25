import type { NextApiRequest, NextApiResponse } from "next";
import { MethodNotAllowedError } from "helpers/ErrorHandling/errors";
import UploadController from "@backend/controller/upload/upload";
import RequestMethod from "@backend/common/RequestMethod";
import chalk from 'chalk';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
      try {
          switch (req.method) {
            case RequestMethod.POST:
                console.log(`you're at the /pages/api/upload/index NextApiHandler's POST method!`)
                 const uploadConfig = await UploadController.create(req, res);
                 res.send(uploadConfig);
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
  }

