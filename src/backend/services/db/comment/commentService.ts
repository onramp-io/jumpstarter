import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Comment } from '@backend/entities/Comment';
import { Project } from '@backend/entities/Project';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'

const commentService = {
  //Add a like to a project by a user
    getAllById: async (body, query) => {
        console.log("inside service");
    /*const {
        user: { uid },
      } = body;*/
    const id = query.id;
    const db = await connection();

    try {
        const comments = await db
            .createQueryBuilder()
            .select()
            .from(Comment, 'comment')
            .where('"projectId" = :id', { id })
            //.andWhere('user = :uid', { uid })
            .getRawMany();

        console.log(comments);
        return comments;
    }
    catch {
        throw new DatabaseError('Database connection failed');
    }
  },

  create: async (body) => {
    const { userId, projectId, comment } = body;

    try {
    const db = await connection();
    //add new category
    const newComment = await db.createQueryBuilder()
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values([{ user: userId, project: projectId, comment }])
      .execute();

      return newComment;
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
        .from(Comment)
        .where('"projectId" = :id', { id })
        //.andWhere('user = :uid', { uid })
        .execute();

      return deleteCategory;

    }
    catch {
      throw new DatabaseError('Database connection failed');
    }
  }
}

export default commentService;
