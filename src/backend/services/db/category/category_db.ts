import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Category } from '@backend/entities/Category';
import connection from '@backend/config/db';

//Add a like to a project by a user
export const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connection();
    const categoryData = await getRepository(Category)
            .createQueryBuilder("category")
            .getMany();
    res.status(200).json(categoryData);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res.status(500).json(message);
  }
};

export const addNewCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await connection();
    //add new category
    const newCategory = await db.createQueryBuilder()
              .createQueryBuilder()
              .insert()
              .into(Category)
              .values([
                {
                  category: req.body.category,
                  picture: req.body.picture,
                  description: req.body.description
                },
              ])
              .execute();
      res.status(200).json(newCategory);
  } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      res.status(500).json(message);
  }
};

export const deleteCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id;
    const db = await connection();
    //delete category with specific id
    const deleteCategory = await db.createQueryBuilder()
            .createQueryBuilder()
            .delete()
            .from(Category)
            .where('id = :id', { id })
            .execute();
      res.status(200).json(deleteCategory);
  } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      res.status(500).json(message);
  }
};
