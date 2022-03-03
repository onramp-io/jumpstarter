import { userService } from '@backend/services/db/user/userService';
import { Request } from '@backend/middleware/verify_request';
import { BadRequestError } from 'helpers/ErrorHandling/errors';
import ProjectService from '@backend/services/db/project/ProjectService';

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
    avatarImgUrl: string;
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
      body: { firstName, lastName, bio, avatarImgUrl },
      user: { uid },
    } = req;
    const dataToUpdate: IUserPut = {
      put: { firstName, lastName, bio, uid, avatarImgUrl },
    };
    const userData = userService.update(dataToUpdate);
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

  getUserProject: async (req: Request) => {
    const {
      user: { uid },
    } = req;
    const userData = ProjectService.findAllByUser(uid);
    return userData;
  },

  getRecommendation: async (req: Request) => {
    const {
      // user: { uid },
      body: { uid },
    } = req;
    const userData = userService.getUserRecommendation(uid);
    return userData;
  },
};
