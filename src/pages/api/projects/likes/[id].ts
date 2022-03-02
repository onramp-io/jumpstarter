import type { NextApiRequest, NextApiResponse } from 'next';
import ProjectController from "@backend/controller/project/ProjectController";
import { Rss } from 'grommet-icons';
import {
  MethodNotAllowedError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';
import { clientResponse } from 'helpers/ErrorHandling/response'
import { methodNotFoundError } from "helpers/ErrorHandling/messaging";
import RequestMethod from "@backend/common/RequestMethod";

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch(req.method) {
      case RequestMethod.GET:
        const data = await ProjectController.getLikes(req)
        clientResponse(res, Success.code, Success.status, Success.message, data);
        break;
      default:throw new MethodNotAllowedError(methodNotFoundError);
    }
  }
  catch (error) {
    clientResponse(res, error.code, error.status, error.message);
  }
}

export default handler;