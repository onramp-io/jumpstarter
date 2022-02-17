import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../model/entities/User';
import connection from '../../model/db';

const addNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(process.env.CONNECTION_STRING);
  const db = await connection();
  const newUser = await db.createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {first_name: "test", last_name: "test", email: "test@test.com", avatar: "test", bio: "test", investedAmt: 0},
          ])
          .execute()
  await db.close();
  console.log(newUser);
  res.json(newUser);
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Get User');
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Update User');
};

const getUserProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Get User projects');
};

const createProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Create project');
};


export default {addNewUser, getUser, updateUser, getUserProjects, createProject};
