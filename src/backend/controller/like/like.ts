import likeService from '@backend/services/db/like/likeService';
  import type { NextApiRequest, NextApiResponse } from 'next';
  import { Request } from '@backend/middleware/verify_request';
import { useRadioGroup } from '@mui/material';

const likeController = {
  //Add a like to a project by a user
  create: async (req: NextApiRequest) => {
    return likeService.create(req.body);
  }
}

export default likeController;