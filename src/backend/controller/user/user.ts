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
  res: NextApiResponse
) => {
  getUser(req, res);
};

export const post_user_controller = async (
  req: Request,
  res: NextApiResponse
) => {
  insertUser(req, res);
};

export const put_user_controller = async (
  req: Request,
  res: NextApiResponse
) => {
  updateUser(req, res);
};

export const delete_user_controller = async (
  req: Request,
  res: NextApiResponse
) => {
  deleteUser(req, res);
};
