import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@backend/controller/category/categoryController';
import {
	StatusCodes
} from 'http-status-codes';

interface Request extends NextApiRequest {
  user: any;
}

export default function handler(
  req: Request,
  res: NextApiResponse
) {
  switch(req.method) {
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
    case 'DELETE':
      categoryController.deleteById(req)
        .then((response) => {
          if (response.status == "success") {
            res.status(StatusCodes.OK).json(response.data);
          } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.err);
          }
        });
      break;
    default: console.log(req.body);
  }
}