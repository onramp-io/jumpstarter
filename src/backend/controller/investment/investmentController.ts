import investmentService from '@backend/services/db/investment/investmentService';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
import { useRadioGroup } from '@mui/material';
  
const investmentController = {
  create: async (req: Request) => {
    const { userId, projectId, fundAmt } = req.body;
    return investmentService.create(userId, projectId, fundAmt);
  }
}

export default investmentController;
  