import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@backend/controller/category/categoryController';
import { Rss } from 'grommet-icons';
import {
	StatusCodes
} from 'http-status-codes';

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  let response;
  try {
    switch(req.method) {
      // go to the get routes file import it from routes/get.ts
      //Basic ping/pong endpoint to test server functionality
      case 'GET':
        response = await categoryController.getAll(req)
        res.status(StatusCodes.OK).json(response);
        break;
      case 'POST':
        response = await categoryController.create(req)
        res.status(StatusCodes.OK).json(response.data);
        break;
      default: console.log(req.body);
    }
  }
  catch (error) {
    res.status(error.code).json(error.message);
  }
}

export default handler;