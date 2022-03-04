import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { Comment } from '@backend/entities/Comment';
import { Project } from '@backend/entities/Project';
import { User } from '@backend/entities/User';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';
import { dbError, notFoundError } from 'helpers/ErrorHandling/messaging';
import chalk from 'chalk';

const commentService = {
  //Add a like to a project by a user
  getAllById: async (query) => {
    const id = query.id;
    console.log(chalk.green(id));
    try {
      const db = await connection();
      console.log(chalk.green(getConnection().isConnected));
      console.log(chalk.green('================='));
      const comments = await db
        .createQueryBuilder()
        .select('*')
        .from('comment', 'comment')
        .innerJoin('user', 'user', 'comment.userId = user.id')
        .where('"projectId" = :id', { id })
        .getRawMany();
      console.log(comments);
      return comments;
    } catch (err) {
      console.log(chalk.red('================='), err);
      throw new DatabaseError(dbError);
    }
  },

  create: async (body, user) => {
    const { userId, projectId, comment } = body;
    try {
      const db = await connection();
      //add new category
      const newComment = await db
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values([{ user: userId, project: projectId, comment }])
        .execute();

      return newComment;
    } catch {
      throw new DatabaseError(dbError);
    }
  },

  deleteById: async (query) => {
    const id = query.id;
    const db = await connection();

    try {
      const deleteCategory = await db
        .createQueryBuilder()
        .delete()
        .from(Comment)
        .where('"projectId" = :id', { id })
        .execute();

      return deleteCategory;
    } catch {
      throw new DatabaseError(dbError);
    }
  },
};

export default commentService;
