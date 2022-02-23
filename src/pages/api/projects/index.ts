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
      const [createdProject, createStatusCode] = await ProjectController.create(
        req
      );
      if (createdProject !== null && createdProject !== undefined) {
        res.status(StatusCodes.CREATED).send({
          payload: createdProject,
        });
      } else {
        return jumpstarterApiErrorHandler(res, createStatusCode);
      }
      break;

    // READ - all rows
    case RequestMethod.GET:
      const [allProjects, findAllStatusCode] = await ProjectController.findAll(
        req
      );
      if (allProjects !== null && allProjects !== undefined) {
        res.status(StatusCodes.OK).send({
          payload: allProjects,
        });
      } else {
        return jumpstarterApiErrorHandler(res, findAllStatusCode);
      }
      break;

    // UPDATE - 1 row
    case RequestMethod.PUT:
      const [updatedProject, updateByIdStatusCode] =
        await ProjectController.updateById(req);
      if (updatedProject !== null && updatedProject !== undefined) {
        res.status(StatusCodes.OK).send({
          payload: updatedProject,
        });
      } else {
        return jumpstarterApiErrorHandler(res, updateByIdStatusCode);
      }
      break;

    // DESTROY - 1 row
    case RequestMethod.DELETE:
      ProjectController.deleteById(req);
      const [deletedProject, deleteByIdStatusCode] =
        await ProjectController.deleteById(req);
      if (deletedProject !== null && deletedProject !== undefined) {
        res.status(StatusCodes.OK).send({
          payload: deletedProject,
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
