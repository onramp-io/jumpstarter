import type { NextApiRequest, NextApiResponse } from "next";
import chalk from "chalk";

import ProjectController from "@backend/controller/project/ProjectController";
import RequestMethod from "@backend/common/RequestMethod";
import { Success } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
} from "helpers/ErrorHandling/errors";
import { methodNotFoundError, routingError } from "helpers/ErrorHandling/messaging";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case RequestMethod.GET:
      try {
        const [foundUser, findByIdStatusCode] =
          await ProjectController.findProjectUserById(req);

        if (findByIdStatusCode === 200) {
          res.status(Success.code).json({
            status: Success.status,
            message: Success.message,
            data: foundUser,
          });
        } else {
          const badRequest = new BadRequestError(routingError);

          res.status(badRequest.code).json({
            status: badRequest.status,
            message: badRequest.message,
          });
        }
      } catch (err) {
        res.status(err.code).json({
          status: err.status,
          message: err.message,
        });
      }
      break;

    default:
      const methodNotAllowed = new MethodNotAllowedError(methodNotFoundError);

      res.status(methodNotAllowed.code).json({
        status: methodNotAllowed.status,
        message: methodNotAllowed.message,
      });
  }
};

export default handler;
