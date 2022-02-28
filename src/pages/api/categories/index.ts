import type { NextApiRequest, NextApiResponse } from 'next';
import categoryController from '@backend/controller/category/categoryController';
import { Rss } from 'grommet-icons';
import { MethodNotAllowedError } from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const categoriesList = await categoryController.getAll(req);
        console.log(categoriesList);
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
          categoriesList,
        });
        break;
      case 'POST':
        const response = await categoryController.create(req);
        res.status(Success.code).json({
          status: Success.status,
          message: Success.message,
        });
        break;
      default:
        throw new MethodNotAllowedError('Method not found');
    }
  } catch (error) {
    res.status(error.code).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default handler;
