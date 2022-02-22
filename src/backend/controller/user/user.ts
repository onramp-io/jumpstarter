import { UserDbService } from '@backend/services/db/user/user_db';
import type { NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';

export const UserController = {
  get: async (req: Request) => {
    const email = req.user.email;
    const userData = await UserDbService.get(email);
    return userData;
  },

  post: async (req: Request) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const userData = await UserDbService.insert(firstName, lastName, email);
    return userData;
  },

  put: async (req: Request) => {
    const email = req.user.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const bio = req.body.bio;
    const avatar = req.body.avatar;
    const userData = await UserDbService.update(
      firstName,
      lastName,
      bio,
      avatar,
      email
    );
    return userData;
  },

  delete: async (req: Request) => {
    const email = req.user.email;
    const userData = await UserDbService.delete(email);
    return userData;
  },

  payOut: async (req: Request) => {
    const email = req.user.email;
    const userData = await UserDbService.payOut(email);
    return userData;
  },
};
