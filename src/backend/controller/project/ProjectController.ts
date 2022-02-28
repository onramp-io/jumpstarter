import type { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "typeorm";
import { Project } from "../../entities/Project";
import { User } from "../../entities/User";
import ProjectService from "@backend/services/db/ProjectService";
import {
  ProjectCreateApiRequest, // CREATE
  ProjectFindAllApiRequest, // READ - all
  ProjectFindByIdApiRequest, // READ - 1
  ProjectUpdateByIdApiRequest, // UPDATE - 1
  ProjectDeleteByIdApiRequest, // DELETE - 1
  ProjectSortByApiRequest, // SORT - all
} from "@backend/common/ProjectRequestApiInterfaces";
import { StatusCodes } from "http-status-codes";
import isNotNullNorUndefined from "@backend/utils/isNotNullNorUndefined";
import isAllTruthy from "@backend/utils/isAllTruthy";
import {
  AuthorizationError,
  BadRequestError,
  UserFacingError,
} from "helpers/ErrorHandling/errors";
import chalk from "chalk";

/**
 * **From each of the methods** on the Controller (e.g. ProjectController.create() ), you:
 * - (1) **Extract data** from req.body (e.g. all parameters needed to create a new Project Row)
 * - (2) **Validate and pre-process** that data (as necessary)
 * - (3) **Pass that** validated **data**, pre-processed **into the corresponding Entity Service** (e.g. ProjectService.create( ))
 * - (4) **Save the data** returned by the Entity Service (e.g. const createdProject = ProjectService.create({ config options }); )
 * - (5) **Return that data** you saved (e.g. return createdProject)
 */
const ProjectController = {
  // CREATE - 1
  create: async (req) => {
    try {
      /** 
       console.log(`You're at the ProjectController.create( ) method!`);
       console.log(`The keys in req.body are:${Object.keys(req.body)}`);
       console.log("req.user is>>>>", req.user); //<--- undefined if access token is expired
 
       * 
       */
      if (req.user.uid === undefined || req.user.uid === null) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      const createParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      /** 
       console.log(
         `createParamsWithUid ===> ${JSON.stringify(createParamsWithUid)}`
       );
       console.log(isAllTruthy(createParamsWithUid)); // true when auth token is new
       console.log(Object.keys(createParamsWithUid).length === 7); // true when auth token is new
       * 
       */
      if (
        isAllTruthy(createParamsWithUid) &&
        Object.keys(createParamsWithUid).length >= 7 // <--- used to be 7 with id.
      ) {
        const createdProj = await ProjectService.create(createParamsWithUid);
        return [createdProj, StatusCodes.CREATED];
        // const awaitedProj = await createdProj;
        // console.log("DFSAFA", awaitedProj);

        /** 
         console.log(
           chalk.green("createdProj[0]===", JSON.stringify(await createdProj[0]))
         );
         * 
         */
      } else {
        throw new BadRequestError("Missing params on req.body");
        // return [null, StatusCodes.BAD_REQUEST]; // 400 (client error, since they forgot to pass in the params needed)
      }

      /** 
       console.log(`***req.user.uid ===>>>> ${req.user.uid}`);
       console.warn(`req.body is missing a parameter!`);
       * 
       */
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
      // return [null, StatusCodes.BAD_REQUEST]; // 400 (client error)
    }
  },

  // READ - 1
  findById: async (req) => {
    try {
      /**
       console.log(req.query);
       console.log(isAllTruthy(req.query));
       console.log(Object.keys(req.query).length === 1);
       *
       */
      if (Object.keys(req.query).length === 1) {
        return await ProjectService.findById(req.query);
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
        // return [null, StatusCodes.BAD_REQUEST];
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
      /** 
       console.log(`you're at ProjectController.updateById( )!`);
       console.log(
         `req.query is composed of ${JSON.stringify(Object.keys(req.query))}`
       );
       console.log(
         `req.body is composed of ${JSON.stringify(Object.keys(req.body))} `
       );
       * 
       */

      /** 
       console.log(isAllTruthy(req.body));
       console.log(isAllTruthy(req.query));
       console.log(Object.keys(req.body).length === 8);
       console.log(Object.keys(req.query).length === 1);
       console.log(Object.keys(req.query.id).length);
       * 
       */
      if (req.user.uid === undefined || req.user.uid === null) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }

      const updateParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };

      /** 
       * 
       console.log(
         chalk.bgGreenBright(
           `req.body === ${JSON.stringify(
             req.body
           )}, req.query === ${JSON.stringify(req.query)}`
         )
       );
       */
      if (
        isAllTruthy(req.body) &&
        Object.keys(req.body).length >= 7 &&
        Object.keys(req.query).length === 1
      ) {
        /** 
         console.log(
           `In ProjectService.updateById(), req.body, req.query,id is indeed all truthy and complete (req.body has complete params!)`
         );
         * 
         */
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
    /** 
     console.log(`you're at ProjectController.deleteById( )!`);
     console.log(`req.query looks like ==> ${JSON.stringify(req.query)}`);
     console.log(
       `req.query.id is composed of ${JSON.stringify(
         Object.keys(req.query.id)
       )} and its length is ${req.query.id.length}`
     );
     * 
     */
    try {
      if (req.user.uid === undefined || req.user.uid === null) {
        throw new AuthorizationError(
          "Auth token does not exist or has expired"
        );
      }
      const deleteParamsWithUid = {
        ...req.body,
        uid: req.user.uid,
      };
      /** 
       console.log(chalk.bgBlueBright(`req.user.uid is.. ${req.user.uid}`));
       console.log(
         chalk.bgBlueBright(
           `deleteParamsWithUid.uid is.. ${deleteParamsWithUid.uid}`
         )
       );
       * 
       */
      // console.log(deleteParamsWithUid.uid, "IS THE UID");

      if (Object.keys(req.query).length === 1) {
        return await ProjectService.deleteById(req.query);
      } else {
        throw new BadRequestError(
          "req.query is missing id (project id) - Did you forget to add the id on the endpoint? e.g. /api/project/10"
        );
        // return [null, StatusCodes.BAD_REQUEST];
      }
    } catch (err) {
      console.warn(
        chalk.bgRed(`Error caught at ProjectController - ${err.message}`)
      );
      throw err;
    }
    /** 
       if (isAllTruthy(req.query.id) && Object.keys(req.query).length === 1) {
         console.log(
           `In ProjectService.deleteById(), req.body is indeed all truthy and complete (req.query.id has complete params!)`
         );
         return ProjectService.deleteById(req.query.id);
       } else {
         throw new Error(
           "Error: req.query.id is missing some params (id)! BAD REQUEST."
         );
         return [null, StatusCodes.BAD_REQUEST];
       }
       * 
       */
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
        return [null, StatusCodes.BAD_REQUEST];
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
