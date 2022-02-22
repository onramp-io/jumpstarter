import {
  addNewInvestment,
  getUserInvestments,
} from '@backend/services/db/investment/investment_db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const addNewInvestmentController = async (
  req: Request,
  res: NextApiResponse
) => {
  addNewInvestment(req, res);
};

export const getUserInvestmentController = async (
  req: Request,
  res: NextApiResponse
) => {
  try {
    const { email } = req.user;
    const userInvestments = await getUserInvestments(email);
    if (userInvestments) {
      res.status(200).json({
        userInvestments,
      });
    } else {
      res.status(404).json({
        message: 'No investments found',
      });
    }
  } catch (error) {
    console.log(
      'ERROR: @getUserInvestmentController api/investment/investments.ts',
      error
    );
    res.status(401).json({ error });
  }
};
