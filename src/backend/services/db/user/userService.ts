import connection from '@backend/config/db';
import {
  IUserPost,
  IUserPut,
  IUserPutAvatar,
} from '@backend/controller/user/user';
import { Investment } from '@backend/entities/Investment';
import { Like } from '@backend/entities/Like';
import { Project } from '@backend/entities/Project';
import { User } from '@backend/entities/User';
import { Comment } from '@backend/entities/Comment';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';
import { getRecommendation } from './recommendationService';
import { Connection } from 'typeorm';

export const userService = {
  get: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .select('*')
      .from('user', 'user')
      .where('uid = :uid', { uid })
      .cache(true)
      .getRawOne();
    if (!userData) throw new NotFoundError('User not found');
    return userData;
  },
  insert: async (dataToInsert: IUserPost) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          firstName: dataToInsert.post.firstName,
          lastName: dataToInsert.post.lastName,
          email: dataToInsert.post.email,
          avatar: '',
          bio: '',
          investedAmt: 0,
          uid: dataToInsert.post.uid,
        },
      ])
      .execute();
    if (!userData) throw new NotFoundError('User not created');
    return userData;
  },

  update: async (dataToUpdate: IUserPut) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        firstName: dataToUpdate.put.firstName,
        lastName: dataToUpdate.put.lastName,
        bio: dataToUpdate.put.bio,
        avatar: dataToUpdate.put.avatarImgUrl,
      })
      .where('uid = :uid', { uid: dataToUpdate.put.uid })
      .execute();
    if (!userData) throw new NotFoundError('User not found');
    return userData;
  },
  delete: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('uid = :uid', { uid })
      .execute();
    if (!userData) throw new NotFoundError('User not found');
    return userData;
  },

  payOut: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        balance: 0,
      })
      .where('uid = :uid', { uid })
      .execute();
    if (!userData) throw new NotFoundError('User not found');
    return userData;
  },

  getCategories: async () => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const categories = await db
      .createQueryBuilder()
      .select('*')
      .from('category', 'category')
      .getRawMany();
    if (!categories) throw new NotFoundError('Categories not found');
    return categories;
  },

  updateInterest: async (categories: string[], uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        interests: categories,
      })
      .where('uid = :uid', { uid })
      .execute();
    if (!userData) throw new NotFoundError('User not found');
    return userData;
  },

  /**
   * * Recommendation System
   */

  getUserRecommendation: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');

    const params = {
      allProjects: await getAllProjects(db, uid),
      invested: await getAllInvestments(db, uid),
      liked: await getAllLikes(db, uid),
      commented: await getAllComments(db, uid),
    };

    const recommendedProjects = getRecommendation(params);
    return recommendedProjects;
  },
};

// 1. Get all projects not created by the user
const getAllProjects = async (db: Connection, uid: string) => {
  const projects = await db
    .createQueryBuilder()
    .addSelect('project.id', 'id')
    .addSelect('project.title', 'title')
    .addSelect('project.category', 'category')
    .from('project', 'project')
    .where(`project.user != (SELECT id FROM public.user WHERE uid = '${uid}')`)
    .cache(true)
    .getRawMany();
  if (!projects) throw new NotFoundError('Projects not found');
  return projects;
};

// 2. Get all the projects that the user has invested in
const getAllInvestments = async (db: Connection, uid: string) => {
  const projectsInvested = await db
    .createQueryBuilder()
    .addSelect('project.id', 'id')
    .addSelect('project.title', 'title')
    .addSelect('project.category', 'category')
    .from(Investment, 'investment')
    .innerJoin(Project, 'project', 'investment.projectId = project.id')
    .innerJoin(User, 'user', 'investment.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsInvested) throw new NotFoundError('Projects not found');
  return projectsInvested;
};

// 3. Get all the projects that the user has liked
const getAllLikes = async (db: Connection, uid: string) => {
  const projectsLiked = await db
    .createQueryBuilder()
    .addSelect('project.id', 'id')
    .addSelect('project.title', 'title')
    .addSelect('project.category', 'category')
    .from(Like, 'like')
    .innerJoin(Project, 'project', 'like.projectId = project.id')
    .innerJoin(User, 'user', 'like.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsLiked) throw new NotFoundError('Projects not found');
  return projectsLiked;
};

// 4. Get all the projects that the user has commented on
const getAllComments = async (db: Connection, uid: string) => {
  const projectsCommented = await db
    .createQueryBuilder()
    .addSelect('project.id', 'id')
    .addSelect('project.title', 'title')
    .addSelect('project.category', 'category')
    .from(Comment, 'comment')
    .innerJoin(Project, 'project', 'comment.projectId = project.id')
    .innerJoin(User, 'user', 'comment.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsCommented) throw new NotFoundError('Projects not found');
  return projectsCommented;
};
