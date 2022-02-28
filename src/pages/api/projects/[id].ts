import type { NextApiRequest, NextApiResponse } from "next";
import ProjectController from "@backend/controller/project/ProjectController";
import RequestMethod from "@backend/common/RequestMethod";
import { Success } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
} from "helpers/ErrorHandling/errors";
import chalk from "chalk";
import { verifyRequest } from "@backend/middleware/verify_request";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // READ - 1
    case RequestMethod.GET:
      try {
        /** 
         console.log(
           `you're at the /pages/api/projects/[id].ts NextApiHandler's GET method!`
         );
         * 
         */
        const [foundProject, findByIdStatusCode] =
          await ProjectController.findById(req);

        /** 
         * 
         console.log(`foundProject === ${JSON.stringify(foundProject)}`);
         console.log(`findByIdStatusCode === ${findByIdStatusCode}`);
         */

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
        throw err;
        // console.warn(err.message); // <-- db service error pops up here!! catch hierarchy!!
      }
      break;

    default:
      const methodNotAllowed = new MethodNotAllowedError("Routing error");

      res.status(methodNotAllowed.code).json({
        status: methodNotAllowed.status,
        message: methodNotAllowed.message,
      });
  }
};

export default handler;
