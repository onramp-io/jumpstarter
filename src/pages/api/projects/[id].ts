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
    // UPDATE - 1 row
    case RequestMethod.PUT:
      try {
        /** 
         console.log(
           `you're at the /pages/api/projects/index NextApiHandler's PUT method!`
         );
         * 
         */
        const [updatedProject, updateByIdStatusCode] =
          await ProjectController.updateById(req);

        /** 
           console.log(`updateByIdStatusCode === ${updateByIdStatusCode}`);
           * 
           */
        if (updateByIdStatusCode === 200) {
          res.status(Success.code).json({
            status: Success.status,
            message: Success.message,
            data: updatedProject,
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
      }
      /** 
       * 
       try {
         console.log(
           `you're at the /pages/api/projects/[id].ts NextApiHandler's PUT method!`
         );
         const [updatedProject, updateByIdStatusCode] =
           await ProjectController.updateById(req);
 
         console.log(`updateByIdStatusCode === ${updateByIdStatusCode}`);
         if (updateByIdStatusCode === 200) {
           res.status(StatusCodes.OK).send({
             data: updatedProject,
           });
         } else {
           throw new Error("Project not updated - see index.ts");
         }
       } catch (err) {
         console.warn(err.message);
       }
       */
      break;

    // DESTROY - 1 row
    case RequestMethod.DELETE:
      try {
        const [deletedProject, deleteByIdStatusCode] =
          await ProjectController.deleteById(req);

        if (deleteByIdStatusCode === 200) {
          res.status(Success.code).json({
            status: Success.status,
            message: Success.message,
            data: deletedProject,
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
      }
      /** 
       const [deletedProject, deleteByIdStatusCode] =
         await ProjectController.deleteById(req);
       if (deletedProject !== null && deletedProject !== undefined) {
         res.status(StatusCodes.OK).send({
           data: deletedProject,
         });
       } else {
         return jumpstarterApiErrorHandler(res, deleteByIdStatusCode);
       }
       * 
       */
      break;

    default:
      const methodNotAllowed = new MethodNotAllowedError("Routing error");

      res.status(methodNotAllowed.code).json({
        status: methodNotAllowed.status,
        message: methodNotAllowed.message,
      });
  }
};

export default verifyRequest(handler);
