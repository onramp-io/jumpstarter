import connection from '@backend/config/db';
import {
  IUserPost,
  IUserPut,
  IUserPutAvatar,
} from '@backend/controller/user/user';
import { User } from '@backend/entities/User';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';

import axios from 'axios';

export const userService = {
  get: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError("Database connection failed");
    const userData = await db
      .createQueryBuilder()
      .select("*")
      .from("user", "user")
      .where("uid = :uid", { uid })
      .getRawOne();
    if (!userData) throw new NotFoundError("User not found"); // <---- this is where the 404 is coming from
    return userData;
  },

  insert: async (dataToInsert: IUserPost) => {
    const db = await connection();
    if (!db) throw new DatabaseError("Database connection failed");
    const userData = await db
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          firstName: dataToInsert.post.firstName,
          lastName: dataToInsert.post.lastName,
          email: dataToInsert.post.email,
          avatar: "",
          bio: "",
          investedAmt: 0,
          uid: dataToInsert.post.uid,
        },
      ])
      .execute();
    if (!userData) throw new NotFoundError("User not created");
    return userData;
  },

  update: async (dataToUpdate: IUserPut) => {
    const db = await connection();
    if (!db) throw new DatabaseError("Database connection failed");
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        firstName: dataToUpdate.put.firstName,
        lastName: dataToUpdate.put.lastName,
        bio: dataToUpdate.put.bio,
        avatar: dataToUpdate.put.avatarImgUrl,
      })
      .where("uid = :uid", { uid: dataToUpdate.put.uid })
      .execute();
    if (!userData) throw new NotFoundError("User not found");
    return userData;
  },
  delete: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError("Database connection failed");
    const userData = await db
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("uid = :uid", { uid })
      .execute();
    if (!userData) throw new NotFoundError("User not found");
    return userData;
  },

  payOut: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError("Database connection failed");
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        balance: 0,
      })
      .where("uid = :uid", { uid })
      .execute();
    if (!userData) throw new NotFoundError("User not found");
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
};
