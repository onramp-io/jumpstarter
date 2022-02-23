import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Category } from '@backend/entities/Category';
import connection from '@backend/config/db';
import {
	StatusCodes,
	getReasonPhrase,
} from 'http-status-codes';
import { jsError } from '@backend/config/errorTypes';

const categoryService = {
  //Add a like to a project by a user
  getAll: async () => {
    const db = await connection();

    try {
      const categoryData = await getRepository(Category)
        .createQueryBuilder("category")
        .getMany();

      return categoryData;
    }
    catch {
      throw new jsError(
        StatusCodes.INTERNAL_SERVER_ERROR, 
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), 
        "Query did not complete. Please make sure entity exists.")
    }
  },

  create: async (body) => {
    const { category, picture, description } = body;

    try {
    const db = await connection();
    //add new category
    const newCategory = await db.createQueryBuilder()
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([{ category, picture, description }])
      .execute();

      return newCategory;
    }
    catch {
      throw new jsError(
        StatusCodes.INTERNAL_SERVER_ERROR, 
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), 
        "Query did not complete. Please make sure you have a valid category and picture")
    }
  },

  deleteById: async (query) => {
    const id = query.id;
    const db = await connection();

    try {
      const deleteCategory = await db.createQueryBuilder()
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where('id = :id', { id })
        .execute();

      return deleteCategory;

    }
    catch {
      throw new jsError(
        StatusCodes.INTERNAL_SERVER_ERROR, 
        getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), 
        "Query did not complete. Please make sure you have a valid id.")
    }
  }
}

export default categoryService;
