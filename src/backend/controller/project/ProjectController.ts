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
import { queryIdError, authError, missingParamsError } from "helpers/ErrorHandling/messaging";

const ProjectController = {
  // CREATE - 1
  create: async (req) => {
    try {
      if (reqIsUnauthorized(req)) {
        throw new AuthorizationError(authError);
      }

      const createParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (reqParamsAreComplete(createParamsWithUid, 7)) {
        const createdProj = await ProjectService.create(createParamsWithUid);
        return [createdProj, StatusCodes.CREATED];
      } else {
        throw new BadRequestError(missingParamsError);
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
        throw new BadRequestError(queryIdError);
      }
    } catch (err) {
      throw err;
    }
  },

  // UPDATE - 1
  updateById: async (req) => {
    try {
      if (reqIsUnauthorized(req)) {
        throw new AuthorizationError(authError);
      }

      if (
        reqParamsAreComplete(req.body, 7) &&
        reqParamsAreComplete(req.query, 1)
      ) {
        return ProjectService.updateById(req.body, req.query.id);
      } else {
        if (!reqParamsAreComplete(req.query, 1)) {
          throw new BadRequestError(queryIdError);
        }

        if (!reqParamsAreComplete(req.body, 7)) {
          throw new BadRequestError(queryIdError);
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
        throw new AuthorizationError(authError);
      }
      const deleteParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (reqParamsAreComplete(req.query, 1)) {
        return await ProjectService.deleteById(parseInt(req.query.id));
      } else {
        throw new BadRequestError(queryIdError);
      }
    } catch (err) {
      throw err;
    }
  },


  // TODO: (Tapa) BS2-16 [BE]: Create endpoint to return a list of recommended Projects based on Projects a User has liked/funded
  // query should be NEWEST, TRENDING, or RECOMMENDED
  sortBy: async (req) => {
    try {
      if (reqParamsAreComplete(req.query, 1)) {
        return ProjectService.sortBy(req.query);
      } else {
        throw new BadRequestError(queryIdError);
      }
    } catch (err) {
      throw err;
    }
  },

  // READ - 1
  addView: async (req) => {
    try {
      if (reqParamsAreComplete(req.query, 1)) {
        return await ProjectService.addView(req.query);
      } else {
        throw new BadRequestError(queryIdError);
      }
    } catch (err) {
      throw err;
    }
  },

  updateTrendScore: async (req) => {
    return await ProjectService.updateTrendScore();
  },

  getLikes: async (req) => {
    try {
      if (reqParamsAreComplete(req.query, 1)) {
        return await ProjectService.getLikes(req.query);
      } else {
        throw new BadRequestError(queryIdError);
      }
    } catch (err) {
      throw err;
    }
  }
};

export default ProjectController;
