import {
  getCategories,
  addNewCategory,
  deleteCategory
} from '@backend/services/db/category/category_db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const getCategoriesController = async (req: Request, res: NextApiResponse) => {
  getCategories(req, res);
};

export const addNewCategoryController = async (req: Request, res: NextApiResponse) => {
  addNewCategory(req, res);
};

export const deleteCategoryController = async (req: Request, res: NextApiResponse) => {
  deleteCategory(req, res);
};