import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@backend/controller/category/categoryController';
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
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
      case 'DELETE':
        const response = await categoryController.deleteById(req)
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