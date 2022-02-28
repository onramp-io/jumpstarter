import type { NextApiRequest, NextApiResponse } from "next";
import ProjectController from "@backend/controller/project/ProjectController";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import jumpstarterApiErrorHandler from "@backend/utils/JumpstarterApiErrorHandler";
import RequestMethod from "@backend/common/RequestMethod";
import { verifyRequest } from "@backend/middleware/verify_request";
import chalk from "chalk";
import { Created, Success } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
  NotFoundError,
} from "helpers/ErrorHandling/errors";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // CREATE - 1 row
    case RequestMethod.POST:
      try {
        /** 
         console.log(
           `you're at the /pages/api/projects/index NextApiHandler's POST method!`
         );
         * 
         */
        const [createdProject, createStatusCode] =
          await ProjectController.create(req);
        /** 
         console.log(`createdProject === ${createdProject}`);
         * 
         */
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
        throw err;
        // console.warn(err.message); // <-- db service error pops up here!! catch hierarchy!!
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
