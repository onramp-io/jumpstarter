import connection from '@backend/config/db';
import { IUserPost, IUserPut } from '@backend/controller/user/user';
import { User } from '@backend/entities/User';

export const userService = {
  get: async (uid: string) => {
    const db = await connection();
    const userData = await db
      .createQueryBuilder()
      .select('*')
      .from('user', 'user')
      .where('uid = :uid', { uid })
      .getRawOne();
    if (!userData) throw new Error('User not found');
    return userData;
  },

  insert: async (dataToInsert: IUserPost) => {
    const db = await connection();
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
    if (!userData) {
      throw new Error('User not created');
    }
    return userData;
  },

  update: async (dataToUpdate: IUserPut) => {
    const db = await connection();
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        firstName: dataToUpdate.put.firstName,
        lastName: dataToUpdate.put.lastName,
        avatar: dataToUpdate.put.avatar,
        bio: dataToUpdate.put.bio,
      })
      .where('uid = :uid', { uid: dataToUpdate.put.uid })
      .execute();
    if (!userData) {
      throw new Error('User not updated');
    }
    return userData;
  },

  delete: async (uid: string) => {
    const db = await connection();
    const userData = await db
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('uid = :uid', { uid })
      .execute();
    if (!userData) {
      throw new Error('User not deleted');
    }
    return userData;
  },

  payOut: async (uid: string) => {
    const db = await connection();
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        balance: 0,
      })
      .where('uid = :uid', { uid })
      .execute();
    if (!userData) {
      throw new Error('User not paid out');
    }
    return userData;
  },
};
