import type { NextApiRequest, NextApiResponse } from "next";
import chalk from "chalk";

import ProjectController from "@backend/controller/project/ProjectController";
import RequestMethod from "@backend/common/RequestMethod";
import { Success } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
} from "helpers/ErrorHandling/errors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // READ - 1
    case RequestMethod.GET:
      try {
        const [foundProject, findByIdStatusCode] =
          await ProjectController.findById(req);

        if (findByIdStatusCode === 200) {
          res.status(Success.code).json({
            status: Success.status,
            message: Success.message,
            data: foundProject,
          });
        } else {
          const badRequest = new BadRequestError("Routing error");

          res.status(badRequest.code).json({
            status: badRequest.status,
            message: badRequest.message,
          });
        }
      } catch (err) {
        console.warn(
          chalk.bgRed(
            `Error caught at /api/projects/[id] Project NextApiHandler - ${err.message}`
          )
        );
        res.status(err.code).json({
          status: err.status,
          message: err.message,
        });
      }
      break;

    default:
      const methodNotAllowed = new MethodNotAllowedError("Method Not Allowed");

      res.status(methodNotAllowed.code).json({
        status: methodNotAllowed.status,
        message: methodNotAllowed.message,
      });
  }
};

export default handler;
