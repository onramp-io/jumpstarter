import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCategoryController } from '@backend/controller/category/category';

type Data = {
  name: string;
};

interface Request extends NextApiRequest {
  user: any;
}

export default function handler(
  req: Request,
  res: NextApiResponse<Data>
) {
  switch(req.method) {
    // go to the get routes file import it from routes/get.ts
    //Basic ping/pong endpoint to test server functionality
    case 'DELETE': deleteCategoryController(req, res); break;
    default: console.log(req.body);
  }
}