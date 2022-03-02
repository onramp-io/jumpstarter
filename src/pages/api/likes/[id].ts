import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
    MethodNotAllowedError,
  } from 'helpers/ErrorHandling/errors';
  import { Success } from 'helpers/ErrorHandling/success';
import { verifyRequest } from '@backend/middleware/verify_request';

interface Request extends NextApiRequest {
    user: any;
  }

const handler = async (req: Request,res: NextApiResponse) => {
    try {
        switch(req.method) {
        case 'GET':
            const likeData = await likeController.getLike(req)
            res.status(Success.code).json({
                status: Success.status,
                message: Success.message,
                likeData
                }); 
            break;
        case 'DELETE':
            await likeController.deleteLike(req)
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

export default verifyRequest(handler);