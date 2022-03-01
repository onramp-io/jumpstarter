import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Comment } from '@backend/entities/Comment';
import { Project } from '@backend/entities/Project';
import { User } from '@backend/entities/User';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'

const commentService = {
  //Add a like to a project by a user
    getAllById: async (body, query) => {
    const id = query.id;
    const db = await connection();

    try {
        const comments = await db
            .createQueryBuilder()
            .select()
            .from(Comment, 'comment')
            .innerJoin(User, 'user', 'comment.userId = user.id')
            .where('"projectId" = :id', { id })
            .getRawMany();
        return comments;
    }
    catch {
        throw new DatabaseError('Database connection failed');
    }
  },

  create: async (body) => {
    const { userId, projectId, comment } = body;
    console.log(body);
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
        .execute();

      return deleteCategory;

    }
    catch {
      throw new DatabaseError('Database connection failed');
    }
  }
}

export default commentService;
