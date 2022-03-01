import { userService } from '@backend/services/db/user/userService';
import { Request } from '@backend/middleware/verify_request';
import { BadRequestError } from 'helpers/ErrorHandling/errors';

export interface IUserPost {
  post: {
    firstName: string;
    lastName: string;
    email: string;
    avatar: string;
    bio: string;
    investedAmt: number;
    uid: string;
  };
}

export interface IUserPut {
  put: {
    firstName: string;
    lastName: string;
    bio: string;
    uid: string;
  };
}
export interface IUserPutAvatar {
  putAvatar: {
    avatar: string;
    uid: string;
  };
}

export const UserController = {
  get: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userData = userService.get(uid);
    return userData;
  },

  post: async (req: Request) => {
    const {
      body: { firstName, lastName, email },
      user: { uid },
    } = req;
    const dataToInsert: IUserPost = {
      post: {
        email,
        firstName,
        lastName,
        avatar: '',
        bio: '',
        investedAmt: 0,
        uid,
      },
    };
    const userData = userService.insert(dataToInsert);
    return userData;
  },

  put: async (req: Request) => {
    const {
      body: { firstName, lastName, bio, avatar },
      user: { uid },
    } = req;
    const dataToUpdate: IUserPut = {
      put: { firstName, lastName, bio, uid },
    };
    const userData = userService.update(dataToUpdate);
    return userData;
  },

  putAvatar: async (req: Request) => {
    console.log(req.body);
    const {
      body: { avatar },
      user: { uid },
    } = req;
    const dataToUpdate: IUserPutAvatar = {
      putAvatar: { avatar, uid },
    };
    const userData = userService.updateAvatar(dataToUpdate);
    return userData;
  },

  delete: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userData = userService.delete(uid);
    return userData;
  },

  payOut: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userData = userService.payOut(uid);
    return userData;
  },

  getCategories: async () => {
    const userData = userService.getCategories();
    return userData;
  },

  updateInterest: async (req: Request) => {
    const {
      body: { categories },
      user: { uid },
    } = req;
    const userData = userService.updateInterest(categories, uid);
    return userData;
  },
};
