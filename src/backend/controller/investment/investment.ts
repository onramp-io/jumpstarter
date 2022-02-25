import { InvestmentsDbService } from '@backend/services/db/investment/investmentService';
import { Request } from '@backend/middleware/verify_request';

export const InvestmentController = {
  getAll: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userInvestments = InvestmentsDbService.getAll(uid);
    return userInvestments;
  },
};
