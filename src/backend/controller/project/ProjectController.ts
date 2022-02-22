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
    // step (1)
    const { createParams } = req.body;

    // step (2) not necessary for this input

    // steps (3) and (4)
    const createdProject = ProjectService.create(createParams);

    // step (5)
    return createdProject;
  },

  // READ - all
  findAll: async (req: ProjectFindAllApiRequest) => {
    const { findAllParams } = req.body;
    const allProjectsArr = ProjectService.findAll(findAllParams);
    return allProjectsArr;
  },

  // READ - 1
  findById: async (req: ProjectFindByIdApiRequest) => {
    const { findByIdParams } = req.body;
    const foundProject = ProjectService.findById(findByIdParams);
    return foundProject;
  },

  // UPDATE - 1
  updateById: async (req: ProjectUpdateByIdApiRequest) => {
    const { updateByIdParams } = req.body;
    const updatedProject = ProjectService.updateById(updateByIdParams);
    return updatedProject;
  },

  // DESTROY - 1
  deleteById: async (req: ProjectDeleteByIdApiRequest) => {
    const { deleteByIdParams } = req.body;
    const deletedProject = ProjectService.deleteById(deleteByIdParams);
    return deletedProject;
  },

  // SORT - all (TODO: add logic to ProjectService.sortBy -- Tapa & Pran)
  sortBy: async (req: ProjectSortByApiRequest) => {
    const { sortByString, sortByParams } = req.body;
    const sortedProjectsArr = ProjectService.sortBy(sortByString, sortByParams);
    return sortedProjectsArr;
  },
};
