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
  create: async (req: ProjectCreateApiRequest) => {
    const { createParams } = req.body;
    if (createParams !== null && createParams !== undefined) {
      return ProjectService.create(createParams);
    } else {
      return [null, StatusCodes.BAD_REQUEST]; // 400 (client error, since they forgot to pass in the params needed)
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
    if (findByIdParams !== null && findAllParams !== undefined) {
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
