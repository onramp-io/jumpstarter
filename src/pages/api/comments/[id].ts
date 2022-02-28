import type { NextApiRequest, NextApiResponse } from 'next';
import commentController from '@backend/controller/comment/comment';
import {
  MethodNotAllowedError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch(req.method) {
        case 'GET':
            const response = await commentController.getAllById(req)
            res.status(Success.code).json({
                status: Success.status,
                message: Success.message,
                response
            });
            break;
        case 'DELETE':
            await commentController.deleteById(req)
            res.status(Success.code).json({
                status: Success.status,
                message: Success.message,
            });
            break;
        default: throw new MethodNotAllowedError('Method not found');
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