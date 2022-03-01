import type { NextApiRequest, NextApiResponse } from "next";
import chalk from "chalk";

import ProjectController from "@backend/controller/project/ProjectController";
import RequestMethod from "@backend/common/RequestMethod";
import { Success } from "helpers/ErrorHandling/success";
import {
  BadRequestError,
  MethodNotAllowedError,
} from "helpers/ErrorHandling/errors";

// TODO: (Pran) BS2-113: [BE] Add Projects API for Trending Logic
// TODO: (Pran) BS2-14 [BE]: Create endpoint to fetch a list of Projects sorted in newest to oldest order
// TODO: (Tapa) BS2-16 [BE]: Create endpoint to return a list of recommended Projects based on Projects a User has liked/funded
// TODO: (Tapa) BS2-114 [BE] Wire up ProjectService.findAllByUser to corresponding Api handler
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    // READ - all rows
    case RequestMethod.GET:
      try {
        const [allProjects, findAllStatusCode] =
          await ProjectController.findAll(req);

        if (findAllStatusCode === 200) {
          res.status(Success.code).json({
            status: Success.status,
            message: Success.message,
            data: allProjects,
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
            `Error caught at /api/projects/index Project NextApiHandler - ${err.message}`
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
