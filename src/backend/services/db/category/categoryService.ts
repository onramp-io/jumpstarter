import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Category } from '@backend/entities/Category';
import connection from '@backend/config/db';

const categoryService = {
  //Add a like to a project by a user
  getAll: async () => {
    try {
      const db = await connection();
      const categoryData = await getRepository(Category)
        .createQueryBuilder("category")
        .getMany();
      return { status: "success", data: categoryData}
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      return { status: "failed", err: message };
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
      return { status: "success", data: newCategory}
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      return { status: "failure", err: message}
    }
  },

  deleteById: async (query) => {
    const id = query.id;
    try {
      const db = await connection();
      //delete category with specific id
      const deleteCategory = await db.createQueryBuilder()
        .createQueryBuilder()
        .delete()
        .from(Category)
        .where('id = :id', { id })
        .execute();
      return { status: "success", data: deleteCategory}
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      return { status: "failure", err: message}
    }
  }

}

export default categoryService;
