import categoryService from '@backend/services/db/category/categoryService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

const categoryController = {
  getAll: async (req: Request) => {
    return categoryService.getAll();
  },

  create: async (req: Request) => {
    const { category, picture, description } = req.body;
    return categoryService.create(category, picture, description);
  },

  deleteById: async (req: Request) => {
    const { id } = req.query;
    return categoryService.deleteById(id);
  }
}

export default categoryController;