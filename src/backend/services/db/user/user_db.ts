import connection from '@backend/config/db';
import { User } from '@backend/model/User';
import type { NextApiRequest, NextApiResponse } from 'next';

export const get_user = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const bio = 'Biolakdsflasjdfl';
  return bio;
};

export const insert_user = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const uid = user.uid;

  const db = await connection();
  const newUser = await db
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        uid: uid,
        avatar: 'test',
        bio: 'test',
        invested_amt: 0,
      },
    ])
    .execute();
  await db.close();
  console.log(newUser);
  res.json(newUser);
};

export const update_user = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const bio = 'Biolakdsflasjdfl';
  return bio;
};

export const delete_user = async (
  req: NextApiRequest,
  res: NextApiResponse,
  user
) => {
  const bio = 'Biolakdsflasjdfl';
  return bio;
};
