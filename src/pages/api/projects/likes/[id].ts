import type { NextApiRequest, NextApiResponse } from 'next';
import ProjectController from "@backend/controller/project/ProjectController";
import { Rss } from 'grommet-icons';
import {
  MethodNotAllowedError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';
import { clientResponse } from 'helpers/ErrorHandling/response'

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch(req.method) {
      case 'GET':
        await ProjectController.getLikes(req)
        clientResponse(res, Success.code, Success.status, Success.message);
        break;
      default:throw new MethodNotAllowedError('Method not found');
    }
  }
  catch (error) {
    clientResponse(res, Success.code, Success.status, Success.message);
  }
}

export default handler;