import type { NextApiRequest, NextApiResponse } from "next";
import ProjectController from "@backend/controller/project/ProjectController";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import jumpstarterApiErrorHandler from "@backend/utils/JumpstarterApiErrorHandler";
import RequestMethod from "@backend/common/RequestMethod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    // READ - 1
    case RequestMethod.GET:
      try {
        console.log(
          `you're at the /pages/api/projects/[id].ts NextApiHandler's GET method!`
        );
        const [foundProject, findByIdStatusCode] =
          await ProjectController.findById(req);

        console.log(`foundProject === ${JSON.stringify(foundProject)}`);
        console.log(`findByIdStatusCode === ${findByIdStatusCode}`);

        if (findByIdStatusCode === 200) {
          res.status(findByIdStatusCode).json({
            data: foundProject,
          });
        } else {
          throw new Error("Project not found - see [id].ts");
        }
      } catch (err) {
        console.warn(err.message); // <-- db service error pops up here!! catch hierarchy!!
      }
      break;
    // UPDATE - 1 row
    case RequestMethod.PUT:
      try {
        console.log(
          `you're at the /pages/api/projects/[id].ts NextApiHandler's PUT method!`
        );
        const [updatedProject, updateByIdStatusCode] =
          await ProjectController.updateById(req);

        console.log(`updateByIdStatusCode === ${updateByIdStatusCode}`);
        if (updateByIdStatusCode === 200) {
          res.status(StatusCodes.OK).json({
            data: updatedProject,
          });
        } else {
          throw new Error("Project not updated - see index.ts");
        }
      } catch (err) {
        console.warn(err.message);
      }
      break;

    // DESTROY - 1 row
    case RequestMethod.DELETE:
      const [deletedProject, deleteByIdStatusCode] =
        await ProjectController.deleteById(req);
      if (deletedProject !== null && deletedProject !== undefined) {
        res.status(StatusCodes.OK).send({
          data: deletedProject,
        });
      } else {
        return jumpstarterApiErrorHandler(res, deleteByIdStatusCode);
      }
      break;

    default:
      res.status(StatusCodes.METHOD_NOT_ALLOWED).send({
        error: getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED),
      });
  }
}
