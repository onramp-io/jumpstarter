import categoryService from '@backend/services/db/category/categoryService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';
import {
  DatabaseError
} from 'helpers/ErrorHandling/errors';

const categoryController = {
  getAll: async (req: Request) => {
    return categoryService.getAll();
  },

  create: async (req: Request) => {
    if ((req.body.category == null) || (req.body.picture == null)) {
      throw new DatabaseError('Database connection failed');
    }
    return categoryService.create(req.body);
  },

  deleteById: async (req: Request) => {
    return categoryService.deleteById(req.query);
  }
}

export default categoryController;