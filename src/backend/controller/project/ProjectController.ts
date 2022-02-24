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
        userId,
        launchDate,
      } = req.body;

      console.log(`title === ${title}`); // currently logs
      console.log(`category === ${category}`);
      console.log(`description === ${description}`);
      console.log(`fundTiers === ${fundTiers}`);
      console.log(`currFundGoal === ${currFundGoal}`);
      console.log(`userId === ${userId}`);
      console.log(`launchDate === ${launchDate}`);

      // this is necessary for the rest of the code in BE to work (ProjectService.create(createParams))
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

      if (isAllTruthy(createParams)) {
        console.log(
          `in ProjectController.create( ) if block, createParams === ${createParams}`
        );
        const createdProj = await ProjectService.create(createParams);
        console.log(
          `createdProj.fundTiers === ${
            createParams.fundTiers
          }, its typeof is ${typeof createParams.fundTiers}`
        );
        return createdProj;
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
    const { findAllParams } = req.body;
    if (findAllParams !== null && findAllParams !== undefined) {
      return ProjectService.findAll(findAllParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST]; // 400 (client error)
    }
  },

  // READ - 1
  findById: async (req: ProjectFindByIdApiRequest) => {
    const { findByIdParams } = req.body;
    if (findByIdParams !== null && findByIdParams !== undefined) {
      return ProjectService.findById(findByIdParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST];
    }
  },

  // UPDATE - 1
  updateById: async (req: ProjectUpdateByIdApiRequest) => {
    const { updateByIdParams } = req.body;
    if (updateByIdParams !== null && updateByIdParams !== undefined) {
      return ProjectService.updateById(updateByIdParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST];
    }
  },

  // DESTROY - 1
  deleteById: async (req: ProjectDeleteByIdApiRequest) => {
    const { deleteByIdParams } = req.body;
    if (deleteByIdParams !== null && deleteByIdParams !== undefined) {
      return ProjectService.deleteById(deleteByIdParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST];
    }
  },

  // SORT - all (TODO: add logic to ProjectService.sortBy -- Tapa & Pran)
  sortBy: async (req: ProjectSortByApiRequest) => {
    const { sortByParams } = req.body;
    if (sortByParams !== null && sortByParams !== undefined) {
      return ProjectService.sortBy(sortByParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST];
    }
  },
};

export default ProjectController;
