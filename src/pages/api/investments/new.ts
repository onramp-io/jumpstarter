import type { NextApiRequest, NextApiResponse } from 'next';
import { InvestmentController } from '../../../backend/controller/investment/investment';

type Data = {
  name: string;
};

interface Request extends NextApiRequest {
  user: any;
}

export default function handler(req: Request, res: NextApiResponse<Data>) {
  //Add new user to database if user does not already exist
  try {
    switch (req.method) {
      case 'POST':
        InvestmentController.create(req)
          .then((response) => {
            res.status(200).json(response.data);
          })
          .catch((err) => {
            res.status(500).json(response.err);
          });
        break;
      default:
        console.log(req.body);
    }
  } catch (error) {}
}
