import commentService from '@backend/services/db/comment/commentService';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Request } from '@backend/middleware/verify_request';
import {
  DatabaseError
} from 'helpers/ErrorHandling/errors';

const commentController = {
  getAllById: async (req: Request) => {
    return commentService.getAllById(req.body, req.query);
  },

  create: async (req: Request) => {
    if ((req.body.comment == null) || (req.body.projectId == null) || (req.body.userId == null)) {
      throw new DatabaseError('Database connection failed');
    }
    return commentService.create(req.body, req.user);
  },

  deleteById: async (req: Request) => {
    return commentService.deleteById(req.query);
  }
}

export default commentController;