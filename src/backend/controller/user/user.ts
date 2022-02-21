import {
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  payOutUser,
} from '@backend/services/db/user/user_db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const getUserController = async (req: Request, res: NextApiResponse) => {
  try {
    // break down request <===========
    const { email } = req.user;
    // call service <===============
    const userData = await getUser(email);
    // send response <==============
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
    console.log('ERROR @ getUserController in controller/user/user.ts', error);
    res.status(500).json(error.message);
  }
};

export const postUserController = async (
  req: Request,
  res: NextApiResponse
) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userData = insertUser(firstName, lastName, email);
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
    console.log('ERROR @ postUserController in controller/user/user.ts', error);
    res.status(500).json(error.message);
  }
};

export const putUserController = async (req: Request, res: NextApiResponse) => {
  updateUser(req, res);
};

export const deleteUserController = async (
  req: Request,
  res: NextApiResponse
) => {
  deleteUser(req, res);
};

export const payoutController = async (req: Request, res: NextApiResponse) => {
  payOutUser(req, res);
};
