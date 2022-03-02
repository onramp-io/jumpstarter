import connection from '@backend/config/db';
import {
  IUserPost,
  IUserPut,
  IUserPutAvatar,
} from '@backend/controller/user/user';
import { User } from '@backend/entities/User';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';

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

  getUserRecommendation: async (uid: string) => {
    const db = await connection();

    // 1. Get all projects not created by the user
    if (!db) throw new DatabaseError('Database connection failed');
    const projects = await db
      .createQueryBuilder()
      .select('*')
      .from('project', 'project')
      .where(
        `project.user != (SELECT id FROM public.user WHERE uid = '${uid}')`
      )
      .getRawMany();
    if (!projects) throw new NotFoundError('Projects not found');
    // 2. Get the projects that the user has invested in
    const projectsInvested = await db
      .createQueryBuilder()
      .select('*')
      .from('investment', 'investment')
      .where(
        `investment.userId = (SELECT id FROM public.user WHERE uid = '${uid}')`
      )
      .getRawMany();
    if (!projectsInvested) throw new NotFoundError('Projects not found');

    // 3. Get the projects that the user has created
    const projectsCreated = await db
      .createQueryBuilder()
      .select('*')
      .from('project', 'project')
      .where(`project.user = (SELECT id FROM public.user WHERE uid = '${uid}')`)
      .getRawMany();
    if (!projectsCreated) throw new NotFoundError('Projects not found');

    // 4. Get the projects that the user has liked
    const projectsLiked = await db
      .createQueryBuilder()
      .select('*')
      .from('like', 'like')
      .where(`like.userId = (SELECT id FROM public.user WHERE uid = '${uid}')`)
      .getRawMany();
    if (!projectsLiked) throw new NotFoundError('Projects not found');

    // 5. Get the projects that the user has commented on
    const projectsCommented = await db
      .createQueryBuilder()
      .select('*')
      .from('comment', 'comment')
      .where(
        `comment.userId = (SELECT id FROM public.user WHERE uid = '${uid}')`
      )
      .getRawMany();
    if (!projectsCommented) throw new NotFoundError('Projects not found');

    /**
     * 6. Give scores to each project based on the above criteria
     * - Invested projects get a score of 4
     * - Created projects get a score of 3
     * - Liked projects get a score of 2
     * - Commented projects get a score of 1
     */
    const projectsWithScores = projects.map((project) => {
      let score = 0;
      projectsInvested.forEach((investment) => {
        if (project.id === investment.projectId) {
          score += 4;
        }
      });
      projectsCreated.forEach((createdProject) => {
        if (project.id === createdProject.id) {
          score += 3;
        }
      });
      projectsLiked.forEach((likedProject) => {
        if (project.id === likedProject.projectId) {
          score += 2;
        }
      });
      projectsCommented.forEach((commentedProject) => {
        if (project.id === commentedProject.projectId) {
          score += 1;
        }
      });
      return { ...project, score };
    });

    console.log(projectsWithScores);

    // 7. Sort the projects based on the scores

    const sortedProjects = projectsWithScores.sort((a, b) => {
      return b.score - a.score;
    });

    // 8. Return the top 10 projects
    return sortedProjects.slice(0, 10);
  },
};
