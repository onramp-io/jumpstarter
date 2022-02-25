import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Category } from '@backend/entities/Category';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'

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
      throw new DatabaseError('Database connection failed');
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
      throw new DatabaseError('Database connection failed');
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
      throw new DatabaseError('Database connection failed');
    }
  }
}

export default categoryService;
