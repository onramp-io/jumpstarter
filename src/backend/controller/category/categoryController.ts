import categoryService from '@backend/services/db/category/categoryService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

const categoryController = {
  getAll: async (req: Request) => {
    const data = await categoryService.getAll();
    return data;
  },

  create: async (req: Request) => {
    const { category, picture, description } = req.body;
    const data = await categoryService.create(category, picture, description);
    return data;
  },

  deleteById: async (req: Request) => {
    const { id } = req.query;
    const data = await categoryService.deleteById(id);
    return data;
  }
}

export default categoryController;