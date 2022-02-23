import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';
import { InvestmentController } from '@backend/controller/investment/investment';

import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from 'http-status-codes';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const investments = await InvestmentController.get(req);
        if (investments) {
          res.status(StatusCodes.OK).json({
            message: 'Investments found',
            investments,
          });
        } else {
          res.status(StatusCodes.NOT_FOUND).json({
            message: 'Investments not found',
          });
        }
        break;
      default:
        res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log('ERROR: handler() in api/investments/get.ts', error);
    res.status(StatusCodes.UNAUTHORIZED).json({ error });
  }
};

export default verifyRequest(handler);
