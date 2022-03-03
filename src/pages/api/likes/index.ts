import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
    MethodNotAllowedError,
  } from 'helpers/ErrorHandling/errors';
import { Success } from 'helpers/ErrorHandling/success';
import { methodNotFoundError } from "helpers/ErrorHandling/messaging";
import RequestMethod from "@backend/common/RequestMethod";
import { clientResponse } from 'helpers/ErrorHandling/response'

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
    try {
        switch(req.method) {
            //Add new like given by user to project
            case RequestMethod.POST:
                const response = await likeController.create(req)
                clientResponse(res, Success.code, Success.status, Success.message, response);
                break;
            default: new MethodNotAllowedError(methodNotFoundError);
        }
    }
    catch (error) {
        clientResponse(res, error.code, error.status, error.message);
    }
}

export default handler;