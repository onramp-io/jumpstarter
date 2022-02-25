import InvestmentsDbService from '@backend/services/db/investment/investmentService';
import { Request } from '@backend/middleware/verify_request';
import {
  DatabaseError
} from 'helpers/ErrorHandling/errors';

export const InvestmentController = {
  getAll: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userInvestments = InvestmentsDbService.getAll(uid);
    return userInvestments;
  },

  create: async (req: Request) => {
    if ((req.body.userId == null) || (req.body.projectId == null) || (req.body.fundAmt == null)) {
      throw new DatabaseError('Database connection failed');
    }
    
    return InvestmentsDbService.create(req.body);
  }
};
