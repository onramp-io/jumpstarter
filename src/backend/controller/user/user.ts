import {
  get_user,
  insert_user,
  update_user,
  delete_user,
} from '@backend/services/db/user/user_db';
import type { NextApiRequest, NextApiResponse } from 'next';

export const get_user_controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const user_bio = await get_user(req, res, user);
  res.status(200).json({
    fName: user.attributes.given_name,
    lName: user.attributes.family_name,
    bio: user_bio,
  });
};

export const post_user_controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const user_bio = await insert_user(req, res, user);
  res.status(200).json({
    message: 'User created successfully',
  });
};

export const put_user_controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const user_bio = await update_user(req, res, user);
  res.status(200).json({
    fName: user.attributes.given_name,
    lName: user.attributes.family_name,
    bio: user_bio,
  });
};

export const delete_user_controller = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const user_bio = await delete_user(req, res, user);
  res.status(200).json({
    fName: user.attributes.given_name,
    lName: user.attributes.family_name,
    bio: user_bio,
  });
};
