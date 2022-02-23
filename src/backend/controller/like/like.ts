import likeService from '@backend/services/db/like/likeService';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
import { useRadioGroup } from '@mui/material';

const likeController = {
  //Add a like to a project by a user
  create: async (req: NextApiRequest) => {
    const { userId, projectId } = req.body;
    const data = await likeService.create(userId, projectId);
    return data;
  }
}

export default likeController;