import type { NextApiRequest, NextApiResponse } from 'next';
import { InvestmentController } from '@backend/controller/investment/investment';
import {
    MethodNotAllowedError,
  } from 'helpers/ErrorHandling/errors';
  import { Success } from 'helpers/ErrorHandling/success';

interface Request extends NextApiRequest {
    user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {

    try {
        //Add new user to database if user does not already exist
        switch(req.method) {
            case 'POST':
                const response = await InvestmentController.create(req)
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