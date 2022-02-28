import type { NextApiRequest, NextApiResponse } from "next";
import chalk from "chalk";

import ProjectController from "@backend/controller/project/ProjectController";
import RequestMethod from "@backend/common/RequestMethod";
import { verifyRequest } from "@backend/middleware/verify_request";
import { Created } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
} from "helpers/ErrorHandling/errors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // CREATE - 1 row
    case RequestMethod.POST:
      try {
        const [createdProject, createStatusCode] =
          await ProjectController.create(req);

        if (createStatusCode === 201 || createStatusCode === 200) {
          res.status(Created.code).json({
            status: Created.status,
            message: Created.message,
            data: createdProject,
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
          chalk.bgRed(`Error caught at Project NextApiHandler - ${err.message}`)
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

export default verifyRequest(handler);
