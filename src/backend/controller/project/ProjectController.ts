import type { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "typeorm";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import ProjectService from "@backend/services/db/ProjectService";
import { StatusCodes } from "http-status-codes";
import isAllTruthy from "@backend/utils/isAllTruthy";
import {
  AuthorizationError,
  BadRequestError,
} from "helpers/ErrorHandling/errors";
import chalk from "chalk";

const ProjectController = {
  // CREATE - 1
  create: async (req) => {
    try {
      if (
        req.user === undefined ||
        req.user.uid === undefined ||
        req.user.uid === null
      ) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      const createParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (
        isAllTruthy(createParamsWithUid) &&
        Object.keys(createParamsWithUid).length >= 7
      ) {
        const createdProj = await ProjectService.create(createParamsWithUid);
        return [createdProj, StatusCodes.CREATED];
      } else {
        throw new BadRequestError("Missing params on req.body");
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },

  // READ - all
  findAll: async (req) => {
    try {
      return await ProjectService.findAll();
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },

  // READ - 1
  findById: async (req) => {
    try {
      if (Object.keys(req.query).length === 1) {
        return await ProjectService.findById(req.query);
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },

  // UPDATE - 1
  updateById: async (req) => {
    try {
      if (
        req.user === undefined ||
        req.user.uid === undefined ||
        req.user.uid === null
      ) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      if (
        isAllTruthy(req.body) &&
        Object.keys(req.body).length >= 7 &&
        Object.keys(req.query).length === 1
      ) {
        return ProjectService.updateById(req.body, req.query.id);
      } else {
        if (Object.keys(req.query).length < 1) {
          throw new BadRequestError(
            "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
          );
        }

        if (Object.keys(req.body).length < 7) {
          throw new BadRequestError("req.body has missing parameters.");
        }
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },

  // DESTROY - 1
  deleteById: async (req) => {
    try {
      if (
        req.user === undefined ||
        req.user.uid === undefined ||
        req.user.uid === null
      ) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }
      const deleteParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      if (Object.keys(req.query).length === 1) {
        return await ProjectService.deleteById(parseInt(req.query.id));
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },

  // SORT - all (TODO: add logic to ProjectService.sortBy -- Tapa & Pran)
  sortBy: async (req) => {
    try {
      if (isAllTruthy(req.body) && Object.keys(req.body).length === 1) {
        return ProjectService.sortBy(req);
      } else {
        throw new Error(
          "req.body is missing sortBy params! (i.e. SortByString.NEWEST, or SortByString.RECOMMENDED, or SortByString.TRENDING"
        );
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
  },
};

export default ProjectController;
