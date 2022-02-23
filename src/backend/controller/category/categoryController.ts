import categoryService from '@backend/services/db/category/categoryService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';
import {
	StatusCodes,
	getReasonPhrase,
} from 'http-status-codes';
import { jsError } from '@backend/config/errorTypes';

const categoryController = {
  getAll: async (req: Request) => {
    return categoryService.getAll();
  },

  create: async (req: Request) => {
    if ((req.body.category == null) || (req.body.picture == null)) {
      throw new jsError(
        StatusCodes.BAD_REQUEST, 
        getReasonPhrase(StatusCodes.BAD_REQUEST), 
        "Must provide a category and picture")
    }
    return categoryService.create(req.body);
  },

  deleteById: async (req: Request) => {
    return categoryService.deleteById(req.query);
  }
}

export default categoryController;