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

export const userService = {
  get: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
    const userData = await db
      .createQueryBuilder()
      .select('*')
      .from('user', 'user')
      .where('uid = :uid', { uid })
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
      investedProjects: await getAllInvestments(db, uid),
      likedProjects: await getAllLikes(db, uid),
      commentedProjects: await getAllComments(db, uid),
    };

    const recommendedProjects = getRecommendation(params);
    return recommendedProjects;
  },
};

const getAllProjects = async (db, uid) => {
  // 1. Get all projects not created by the user
  const projects = await db
    .createQueryBuilder()
    .addSelect('project.title', 'projectTitle')
    .addSelect('project.category', 'projectCategory')
    .from('project', 'project')
    .where(`project.user != (SELECT id FROM public.user WHERE uid = '${uid}')`)
    .cache(true)
    .getRawMany();
  if (!projects) throw new NotFoundError('Projects not found');
  return projects;
};

const getAllInvestments = async (db, uid) => {
  // 2. Get all the projects that the user has invested in
  const projectsInvested = await db
    .createQueryBuilder()
    .addSelect('project.title', 'projectTitle')
    .addSelect('project.category', 'projectCategory')
    .from(Investment, 'investment')
    .innerJoin(Project, 'project', 'investment.projectId = project.id')
    .innerJoin(User, 'user', 'investment.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsInvested) throw new NotFoundError('Projects not found');
  return projectsInvested;
};

const getAllLikes = async (db, uid) => {
  // 3. Get all the projects that the user has liked
  const projectsLiked = await db
    .createQueryBuilder()
    .addSelect('project.title', 'projectTitle')
    .addSelect('project.category', 'projectCategory')
    .from(Like, 'like')
    .innerJoin(Project, 'project', 'like.projectId = project.id')
    .innerJoin(User, 'user', 'like.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsLiked) throw new NotFoundError('Projects not found');
  return projectsLiked;
};

const getAllComments = async (db, uid) => {
  // 4. Get all the projects that the user has commented on
  const projectsCommented = await db
    .createQueryBuilder()
    .addSelect('project.title', 'projectTitle')
    .addSelect('project.category', 'projectCategory')
    .from(Comment, 'comment')
    .innerJoin(Project, 'project', 'comment.projectId = project.id')
    .innerJoin(User, 'user', 'comment.userId = user.id')
    .where('user.uid = :uid', { uid })
    .cache(true)
    .getRawMany();
  if (!projectsCommented) throw new NotFoundError('Projects not found');
  return projectsCommented;
};
