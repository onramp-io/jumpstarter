import type { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "typeorm";
import Project from "../../entities/Project";
import User from "../../entities/Project";
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

/**
 * **From each of the methods** on the Controller (e.g. ProjectController.create() ), you:
 * - (1) **Extract data** from req.body (e.g. all parameters needed to create a new Project Row)
 * - (2) **Validate and pre-process** that data (as necessary)
 * - (3) **Pass that** validated **data**, pre-processed **into the corresponding Entity Service** (e.g. ProjectService.create( ))
 * - (4) **Save the data** returned by the Entity Service (e.g. const createdProject = ProjectService.create({ config options }); )
 * - (5) **Return that data** you saved (e.g. return createdProject)
 */
const ProjectController = {
  // CREATE
  create: async (req) => {
    try {
      console.log(`You're at the ProjectController.create( ) method!`);
      /**
       * Destructuring from req.body is necessary for Frontend to be able to use Forms to populate req.body
       */

      const {
        title,
        category,
        description,
        fundTiers,
        currFundGoal,
        user,
        launchDate,
      } = req.body;

      console.log(`title === ${title}`); // currently logs
      console.log(`category === ${category}`);
      console.log(`description === ${description}`);
      console.log(`fundTiers === ${fundTiers}`);
      console.log(`currFundGoal === ${currFundGoal}`);
      console.log(`user === ${user}`);
      console.log(`launchDate === ${launchDate}`);

      /** 
       * 
       const createParams = {
         title,
         category,
         description,
         fundTiers,
         currFundGoal,
         userId,
         launchDate,
        };
        const fakeCreateParams = {
          title: "Your fake create params!",
          category: "ART",
          description: "Fake description from ProjectController.create( )!",
          fundTiers: [100, 200, 300, 400],
          currFundGoal: 400,
          userId: 3,
          launchDate: "15:12:02.020.001230",
        };
       */
      // this is necessary for the rest of the code in BE to work (ProjectService.create(createParams))

      /** 
       * all the ff. are currently undefined!
       console.log(`title === ${title}`);
       console.log(`category === ${category}`);
       console.log(`description === ${description}`);
       console.log(`fundTiers === ${fundTiers}`);
       console.log(`currFundGoal === ${currFundGoal}`);
       console.log(`userId === ${userId}`);
       console.log(`launchDate === ${launchDate}`);
       */

      // pass in a fake object with hardcoded values for now!!! check if it works

      // console.log(JSON.stringify(Object.keys(req.body).length));
      console.log(`The keys in req.body are:${Object.keys(req.body)}`);
      if (isAllTruthy(req.body) && Object.keys(req.body).length === 7) {
        console.log(
          `in ProjectController.create( ) if block, req.body === ${req.body}`
        );
        const createdProj = await ProjectService.create(req.body);
        console.log(
          `stringified createdProj === ${JSON.stringify(createdProj)}`
        );
        return [createdProj, StatusCodes.CREATED];
      } else {
        console.warn(`req.body is missing a parameter!`);
        return [null, StatusCodes.BAD_REQUEST]; // 400 (client error, since they forgot to pass in the params needed)
      }
    } catch (err) {
      console.warn(err.message);
    }
  },

  // READ - all
  findAll: async (req: ProjectFindAllApiRequest) => {
    try {
      // no need to destructure out from req.body -- findAll needs no params
      return await ProjectService.findAll(undefined);
    } catch (err) {
      console.warn(err.message);
      return [null, StatusCodes.BAD_REQUEST]; // 400 (client error)
    }
  },

  // READ - 1
  findById: async (req) => {
    if (isAllTruthy(req.body) && Object.keys(req.body).length === 1) {
      return await ProjectService.findById(req.body);
    } else {
      console.warn("req.body is missing id (project id)");
      throw new Error("req.body is missing id (project id)");
      return [null, StatusCodes.BAD_REQUEST];
    }
  },

  // UPDATE - 1
  updateById: async (req) => {
    console.log(`you're at ProjectController.updateById( )!`);
    console.log(
      `req.body is composed of ${JSON.stringify(
        Object.keys(req.body)
      )} and its length is ${req.body.length}`
    );

    if (isAllTruthy(req.body) && Object.keys(req.body).length === 8) {
      console.log(
        `In ProjectService.updateById(), req.body is indeed all truthy and complete (req.body has complete params!)`
      );
      return ProjectService.updateById(req.body);
    } else {
      throw new Error("Error: req.body is missing some params!");
    }
  },

  // DESTROY - 1
  deleteById: async (req) => {
    console.log(`you're at ProjectController.deleteById( )!`);
    console.log(
      `req.body is composed of ${JSON.stringify(
        Object.keys(req.body)
      )} and its length is ${req.body.length}`
    );

    if (isAllTruthy(req.body) && Object.keys(req.body).length === 1) {
      console.log(
        `In ProjectService.deleteById(), req.body is indeed all truthy and complete (req.body has complete params!)`
      );
      return ProjectService.deleteById(req.body);
    } else {
      throw new Error("Error: req.body is missing some params!");
      return [null, StatusCodes.BAD_REQUEST];
    }
  },

  // SORT - all (TODO: add logic to ProjectService.sortBy -- Tapa & Pran)
  sortBy: async (req) => {
    if (isAllTruthy(req.body) && Object.keys(req.body).length === 1) {
      return ProjectService.sortBy(sortByParams);
    } else {
      throw new Error(
        "req.body is missing sortBy params! (i.e. SortByString.NEWEST, or SortByString.RECOMMENDED, or SortByString.TRENDING"
      );
      return [null, StatusCodes.BAD_REQUEST];
    }
  },
};

export default ProjectController;
