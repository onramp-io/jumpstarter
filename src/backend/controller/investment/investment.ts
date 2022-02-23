import { InvestmentsDbService } from '@backend/services/db/investment/investment_db';
import { Request } from '@backend/middleware/verify_request';

export const InvestmentController = {
  create: async (req: Request) => {
    const { userId, projectId, fundAmt } = req.body;
    const data = await InvestmentsDbService.create(userId, projectId, fundAmt);
    return data;
  },

  get: async (req: Request) => {
    const { email } = req.user;
    const userInvestments = await InvestmentsDbService.get(email);
    return userInvestments;
  },
};
