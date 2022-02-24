import { userService } from '@backend/services/db/user/userService';
import { Request } from '@backend/middleware/verify_request';

export interface IUserPost {
  post: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    bio: string;
    investedAmt: number;
  };
}

export interface IUserPut {
  put: {
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    email: string;
  };
}

export const UserController = {
  get: async (req: Request) => {
    const {
      user: { email },
    } = req;
    const userData = userService.get(email);
    return userData;
  },

  post: async (req: Request) => {
    const {
      body: { firstName, lastName, email },
    } = req;
    const dataToInsert: IUserPost = {
      post: {
        email,
        firstName,
        lastName,
        avatar: '',
        bio: '',
        investedAmt: 0,
      },
    };
    const userData = userService.insert(dataToInsert);
    return userData;
  },

  put: async (req: Request) => {
    const email = req.user.email;
    const {
      body: { firstName, lastName, bio, avatar },
    } = req;
    const dataToUpdate: IUserPut = {
      put: { email, firstName, lastName, bio, avatar },
    };
    const userData = userService.update(dataToUpdate);
    return userData;
  },

  delete: async (req: Request) => {
    const {
      user: { email },
    } = req;
    const userData = userService.delete(email);
    return userData;
  },

  payOut: async (req: Request) => {
    const {
      user: { email },
    } = req;
    const userData = userService.payOut(email);
    return userData;
  },
};
