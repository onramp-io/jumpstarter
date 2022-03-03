import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
    MethodNotAllowedError,
  } from 'helpers/ErrorHandling/errors';
  import { Success } from 'helpers/ErrorHandling/success';
import { verifyRequest } from '@backend/middleware/verify_request';
import RequestMethod from "@backend/common/RequestMethod";
import { methodNotFoundError } from "helpers/ErrorHandling/messaging";
import { clientResponse } from 'helpers/ErrorHandling/response'

interface Request extends NextApiRequest {
    user: any;
  }

const handler = async (req: Request,res: NextApiResponse) => {
    try {
        switch(req.method) {
        case RequestMethod.GET:
            const likeData = await likeController.getLike(req)
            clientResponse(res, Success.code, Success.status, Success.message, likeData);
            break;
        case RequestMethod.DELETE:
            await likeController.deleteLike(req)
            clientResponse(res, Success.code, Success.status, Success.message);
            break;
        default: new MethodNotAllowedError(methodNotFoundError);
        }
    }
    catch (error) {
        clientResponse(res, error.code, error.status, error.message);
    }
}

export default verifyRequest(handler);