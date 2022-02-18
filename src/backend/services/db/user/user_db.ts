import connection from '@backend/config/db';
import { User } from '@backend/entities/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const getUser = async (
  req: Request,
  res: NextApiResponse,
  user: any
) => {
  const db = await connection();
  try {
    const email = req.user.email;
    console.log('email', email);
    const userData = await db
      .createQueryBuilder()
      .select('*')
      .from('user', 'user')
      .where('email = :email', { email })
      .getRawOne();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        userData,
      });
    } else {
      res.status(404).json({
        message: 'User not found',
      });
    }
  } catch (error) {
    console.log('ERROR: getUser() in user_db.ts', error);
  }
};

export const insertUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user: any
) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const uid = user.uid;

  const db = await connection();
  try {
    const userData = await db
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          avatar: '',
          bio: '',
          investedAmt: 0,
        },
      ])
      .execute();
    // await db.close();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: 'User created',
      });
    } else {
      res.status(404).json({
        message: 'User not created',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const bio = 'Biolakdsflasjdfl';
  return bio;
};

export const deleteUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const bio = 'Biolakdsflasjdfl';
  return bio;
};
