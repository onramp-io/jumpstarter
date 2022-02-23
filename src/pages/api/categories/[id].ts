import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@backend/controller/category/categoryController';
import {
	StatusCodes,
  getReasonPhrase,
} from 'http-status-codes';

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
        res.status(StatusCodes.OK).json(response);
        break;
      default: res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
      }
    }
    catch (error) {
      res.status(error.code).json(error.message);     
    }
  }
  

  export default handler;