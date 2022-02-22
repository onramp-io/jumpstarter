import { getUserInvestmentController } from '@backend/controller/investment/investment';
import { verifyRequest } from '@backend/middleware/verify_request';
import type { NextApiRequest, NextApiResponse } from 'next';

interface Request extends NextApiRequest {
  user: any;
}
const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        getUserInvestmentController(req, res);
        break;
      default:
        res.status(404).json({
          message: 'Method not found',
        });
    }
  } catch (error) {
    console.log('ERROR: handler() in api/investments/get.ts', error);
    res.status(401).json({ error });
  }
};

export default verifyRequest(handler);
