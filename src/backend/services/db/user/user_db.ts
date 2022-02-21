import connection from '@backend/config/db';
import { User } from '@backend/entities/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

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

export const updateUser = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.avatar,
        bio: req.body.bio,
      })
      .where('email = :email', { email })
      .execute();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: 'User updated',
      });
    } else {
      res.status(404).json({
        message: 'User not updated',
      });
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res.status(500).json(message);
  }
};

export const deleteUser = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('email = :email', { email })
      .execute();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: 'User deleted',
      });
    } else {
      res.status(404).json({
        message: 'User not deleted',
      });
    }
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    res.status(500).json(message);
  }
};

export const payOutUser = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .update(User)
      .set({
        investedAmt: 0,
      })
      .where('email = :email', { email })
      .execute();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: 'User payed out',
      });
    } else {
      res.status(404).json({
        message: 'User not payed out',
      });
    }
  } catch (error) {
    console.log(error);
  }
};
