import investmentService from '@backend/services/db/investment/investmentService';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
import { useRadioGroup } from '@mui/material';
import {
	StatusCodes,
	getReasonPhrase,
} from 'http-status-codes';
import { jsError } from '@backend/config/errorTypes';
  
const investmentController = {
  create: async (req: Request) => {
    if ((req.body.userId == null) || (req.body.projectId == null) || (req.body.fundAmt == null)) {
      throw new jsError(
        StatusCodes.BAD_REQUEST, 
        getReasonPhrase(StatusCodes.BAD_REQUEST), 
        "Must provide a userId, projectId, and fundAmt")
    }
    
    return investmentService.create(req.body);
  }
}

export default investmentController;
  