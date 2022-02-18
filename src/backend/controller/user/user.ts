import {
  getUser,
  insertUser,
  updateUser,
  deleteUser,
} from '@backend/services/db/user/user_db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const get_user_controller = async (
  req: Request,
  res: NextApiResponse,
  user
) => {
  getUser(req, res, user);
};

export const post_user_controller = async (
  req: Request,
  res: NextApiResponse,
  user
) => {
  insertUser(req, res, user);
};

export const put_user_controller = async (
  req: Request,
  res: NextApiResponse,
  user
) => {
  updateUser(req, res, user);
};

export const delete_user_controller = async (
  req: Request,
  res: NextApiResponse,
  user
) => {
  deleteUser(req, res, user);
};
