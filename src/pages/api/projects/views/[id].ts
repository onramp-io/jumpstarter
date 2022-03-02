import type { NextApiRequest, NextApiResponse } from 'next';
import ProjectController from "@backend/controller/project/ProjectController";
import { Rss } from 'grommet-icons';
import {
  MethodNotAllowedError,
} from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';
import { methodNotFoundError } from "helpers/ErrorHandling/messaging";
import { clientResponse } from 'helpers/ErrorHandling/response';
import RequestMethod from "@backend/common/RequestMethod";

interface Request extends NextApiRequest {
  user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {
  try {
    switch(req.method) {
      case RequestMethod.PUT:
        await ProjectController.addView(req)
        clientResponse(res, Success.code, Success.status, Success.message);
        break;
      default:throw new MethodNotAllowedError(methodNotFoundError);
    }
  }
  catch (error) {
    clientResponse(res, error.code, error.status, error.message);
  }
}

export default handler;