import connection from '@backend/config/db';
import { User } from '@backend/entities/User';

export const UserDbService = {
  get: async (email: string) => {
    try {
      const db = await connection();
      const userData = await db
        .createQueryBuilder()
        .select('*')
        .from('user', 'user')
        .where('email = :email', { email })
        .getRawOne();
      if (!userData) throw new Error('User not found');
      return userData;
    } catch (error) {
      console.warn(error.message);
    }
  },

  insert: async (firstName: string, lastName: string, email: string) => {
    try {
      const db = await connection();
      const userData = await db
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {
            firstName: firstName,
            lastName: lastName,
            email: email,
            avatar: '',
            bio: '',
            investedAmt: 0,
          },
        ])
        .execute();
      if (!userData) {
        throw new Error('User not created');
      }
      return userData;
    } catch (error) {
      console.warn(error.message);
    }
  },

  update: async (
    email: string,
    firstName: string,
    lastName: string,
    bio: string,
    avatar: string
  ) => {
    try {
      const db = await connection();
      const userData = await db
        .createQueryBuilder()
        .update(User)
        .set({
          firstName: firstName,
          lastName: lastName,
          avatar: avatar,
          bio: bio,
        })
        .where('email = :email', { email })
        .execute();
      if (!userData) {
        throw new Error('User not updated');
      }
      return userData;
    } catch (error) {
      console.warn(error.message);
    }
  },

  delete: async (email: string) => {
    try {
      const db = await connection();
      const userData = await db
        .createQueryBuilder()
        .delete()
        .from(User)
        .where('email = :email', { email })
        .execute();
      if (!userData) {
        throw new Error('User not deleted');
      }
      return userData;
    } catch (error) {
      console.warn(error.message);
    }
  },

  payOut: async (email: string) => {
    try {
      const db = await connection();
      const userData = await db
        .createQueryBuilder()
        .update(User)
        .set({
          balance: 0,
        })
        .where('email = :email', { email })
        .execute();
      if (!userData) {
        throw new Error('User not paid out');
      }
      return userData;
    } catch (error) {
      console.warn(error.message);
    }
  },
};
