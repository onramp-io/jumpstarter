import {
    addNewLike
  } from '@backend/services/db/like/like_db';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';

  //Add a like to a project by a user
export const addNewLikeController = async (req: NextApiRequest, res: NextApiResponse) => {
    //extract request body
    addNewLike(req, res);
};