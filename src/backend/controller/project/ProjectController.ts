import type { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "typeorm";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import ProjectService from "@backend/services/db/project/ProjectService";
import { StatusCodes } from "http-status-codes";
import isAllTruthy from "@backend/utils/isAllTruthy";
import {
  AuthorizationError,
  BadRequestError,
} from "helpers/ErrorHandling/errors";
import chalk from "chalk";
import reqIsUnauthorized from "@backend/utils/reqIsUnauthorized";
import reqParamsAreComplete from "@backend/utils/reqParamsAreComplete";

const ProjectController = {
  // CREATE - 1
  create: async (req) => {
    try {
      if (reqIsUnauthorized(req)) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      const createParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (reqParamsAreComplete(createParamsWithUid, 7)) {
        const createdProj = await ProjectService.create(createParamsWithUid);
        return [createdProj, StatusCodes.CREATED];
      } else {
        throw new BadRequestError("Missing params on req.body");
      }
    } catch (err) {
      throw err;
    }
  },

  // READ - all
  findAll: async (req) => {
    try {
      return await ProjectService.findAll();
    } catch (err) {
      throw err;
    }
  },

  // READ - 1
  findById: async (req) => {
    try {
      if (reqParamsAreComplete(req.query, 1)) {
        return await ProjectService.findById(req.query);
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
      }
    } catch (err) {
      throw err;
    }
  },

  // UPDATE - 1
  updateById: async (req) => {
    try {
      if (reqIsUnauthorized(req)) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      if (
        reqParamsAreComplete(req.body, 7) &&
        reqParamsAreComplete(req.query, 1)
      ) {
        return ProjectService.updateById(req.body, req.query.id);
      } else {
        if (!reqParamsAreComplete(req.query, 1)) {
          throw new BadRequestError(
            "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
          );
        }

        if (!reqParamsAreComplete(req.body, 7)) {
          throw new BadRequestError("req.body has missing parameters.");
        }
      }
    } catch (err) {
      throw err;
    }
  },

  // DESTROY - 1
  deleteById: async (req) => {
    try {
      if (reqIsUnauthorized(req)) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }
      const deleteParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (reqParamsAreComplete(req.query, 1)) {
        return await ProjectService.deleteById(parseInt(req.query.id));
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
      }
    } catch (err) {
      throw err;
    }
  },

  // TODO: (Pran) BS2-113: Add Projects API for Trending Logic
  // TODO: (Pran) BS2-14 [BE]: Create endpoint to fetch a list of Projects sorted in newest to oldest order
  // TODO: (Tapa) BS2-16 [BE]: Create endpoint to return a list of recommended Projects based on Projects a User has liked/funded
  sortBy: async (req) => {
    try {
      if (reqParamsAreComplete(req.body, 1)) {
        return ProjectService.sortBy(req);
      } else {
        throw new Error(
          "req.body is missing sortBy params! (i.e. SortByString.NEWEST, or SortByString.RECOMMENDED, or SortByString.TRENDING"
        );
      }
    } catch (err) {
      throw err;
    }
  },
};

export default ProjectController;
