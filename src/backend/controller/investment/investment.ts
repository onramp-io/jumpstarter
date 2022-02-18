import {
    addNewInvestment
  } from '@backend/services/db/investment/investment_db';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
  
  export const addNewInvestmentController = async (req: Request, res: NextApiResponse) => {
    addNewInvestment(req, res);
  };
  