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
    // CREATE - 1 row
    case RequestMethod.POST:
      try {
        console.log(
          `you're at the /pages/api/projects/index NextApiHandler's POST method!`
        );
        const [createdProject, createStatusCode] =
          await ProjectController.create(req);
        console.log(`createdProject === ${createdProject}`);
        if (createStatusCode === 201) {
          res.status(createStatusCode).json({
            data: createdProject,
          });
        }
      } catch (err) {
        console.warn(err.message); // <-- db service error pops up here!! catch hierarchy!!
      }
      break;

    // READ - all rows
    case RequestMethod.GET:
      try {
        console.log(
          `you're at the /pages/api/projects/index NextApiHandler's GET method!`
        );
        const [allProjects, findAllStatusCode] =
          await ProjectController.findAll(req);

        console.log(`findAllStatusCode === ${findAllStatusCode}`);

        if (findAllStatusCode === 200) {
          res.status(findAllStatusCode).json({
            data: allProjects,
          });
        } else {
          throw new Error("Projects not found - see index.ts");
        }
      } catch (err) {
        console.warn(err.message); // <-- db service error pops up here!! catch hierarchy!!
      }
      break;

    // UPDATE - 1 row
    case RequestMethod.PUT:
      try {
        console.log(
          `you're at the /pages/api/projects/index NextApiHandler's PUT method!`
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
      break;

    // DESTROY - 1 row
    case RequestMethod.DELETE:
      ProjectController.deleteById(req);
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
