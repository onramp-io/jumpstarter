import investmentService from '@backend/services/db/investment/investmentService';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
import { useRadioGroup } from '@mui/material';
  
const investmentController = {
  create: async (req: Request) => {
    return investmentService.create(req.body);
  }
}

export default investmentController;
  