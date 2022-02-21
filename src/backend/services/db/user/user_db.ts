import connection from '@backend/config/db';
import { User } from '@backend/entities/User';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const getUser = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .select('*')
      .from('user', 'user')
      .where('email = :email', { email })
      .getRawOne();
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

export const insertUser = async (req: Request, res: NextApiResponse) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const db = await connection();
  try {
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
    console.log("CATCH: " + error);
  }
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
    console.log(error);
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
    console.log(error);
  }
};
