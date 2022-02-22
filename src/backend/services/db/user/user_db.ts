import connection from '@backend/config/db';
import { User } from '@backend/entities/User';

export const getUser = async (email: string) => {
  const db = await connection();
  const userData = await db
    .createQueryBuilder()
    .select('*')
    .from('user', 'user')
    .where('email = :email', { email })
    .getRawOne();
  return userData;
};

export const insertUser = async (
  firstName: string,
  lastName: string,
  email: string
) => {
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
  return userData;
};

export const updateUser = async (
  email: string,
  firstName: string,
  lastName: string,
  bio: string,
  avatar: string
) => {
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
  return userData;
};

export const deleteUser = async (email: string) => {
  const db = await connection();
  const userData = await db
    .createQueryBuilder()
    .delete()
    .from(User)
    .where('email = :email', { email })
    .execute();
  return userData;
};

export const payOutUser = async (email: string) => {
  const db = await connection();
  const userData = await db
    .createQueryBuilder()
    .update(User)
    .set({
      investedAmt: 0,
    })
    .where('email = :email', { email })
    .execute();
  return userData;
};
