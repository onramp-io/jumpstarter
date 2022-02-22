import connection from "@backend/config/db";
import Project from "@backend/entities/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";
import prepareDbConnection from "@backend/lib/prepareDbConnection";
import { createQueryBuilder, Db, getConnection } from "typeorm";
import { ProjectPayloadInterface, sortByString, sortByStringType } from "@backend/common/ProjectPayload"; from "@backend/common/ProjectPayload";
import ProjectPayload from "@backend/common/ProjectRequestApiInterfaces";
import SortByConfig from "@backend/common/SortByConfig";

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: async ({ create }: ProjectPayloadInterface) => {
    try {
      await prepareDbConnection();
      const projectInsertResult = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(create)
        .execute();
      return projectInsertResult;
    } catch (err) {
      console.warn(err.message);
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records
   */
  findAll: async ({ findAll }: ProjectPayloadInterface) => {
    try {
      await prepareDbConnection();
      const allProjectRows: Project[] = await getConnection()
        .createQueryBuilder()
        .getMany();
      return allProjectRows;
    } catch (err) {
      console.warn(err.message);
    }
  },

  /**
   * READ: 'GET' request for **ONE Record by ID**
   */
  findById: async ({ findById }: ProjectPayloadInterface) => {
    try {
      await prepareDbConnection();
      const foundProject = await createQueryBuilder()
        .where("project.id = :id", findById)
        .getOne();
      return foundProject;
    } catch (err) {
      console.warn(err.message);
    }
  },

  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: async ({ updateById }: ProjectPayloadInterface) => {
    try {
      await prepareDbConnection();
      const updatedProject = await createQueryBuilder()
        .update(Project)
        .set(updateById) // <-- this is where we pass in the params we want to update records with
        .where("id = :id", { id: updateById.id })
        .execute();
      return updatedProject;
    } catch (err) {
      console.warn(err.message);
    }
  },

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: async ({ deleteById }: ProjectPayloadInterface) => {
    try {
      await prepareDbConnection();
    } catch (err) {
      console.warn(err.message);
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   */
  sortBy: async (
    sortByString: sortByStringType,
    { sortBy }: ProjectPayloadInterface
  ) => {
    if (sortByString === SortByConfig.NEWEST) {
    // TODO: Add sorting logic for createdAt column @Summer

    } else if (sortByString === SortByConfig.TRENDING) {
    // TODO: Add logic for Trending (@Pran)

    } else if (sortByString === SortByConfig.RECOMMENDED) {
    // TODO: Add logic here for Recommended (@Tapa)
    }
  },
};

export default ProjectService;
