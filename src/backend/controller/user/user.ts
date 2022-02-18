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
  // break down request <===========
  getUser(req, res);
  // respond back to client with soem data <===========
};

export const postUserController = async (
  req: Request,
  res: NextApiResponse
) => {
  insertUser(req, res);
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
