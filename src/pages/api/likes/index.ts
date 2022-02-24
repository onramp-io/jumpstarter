import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
    MethodNotAllowedError,
  } from 'helpers/ErrorHandling/errors';
  import { Success } from 'helpers/ErrorHandling/success';

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
    try {
        switch(req.method) {
            //Add new like given by user to project
            case 'POST':
                const response = await likeController.create(req)
                res.status(Success.code).json({
                    status: Success.status,
                    message: Success.message,
                  }); 
                break;
            default: new MethodNotAllowedError('Method not found');
        }
    }
    catch (error) {
        res.status(error.code).json({
            status: error.status,
            message: error.message,
          });
    }
}

export default handler;