import connection from "@backend/config/db";
import { Project } from "@backend/entities/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";
import prepareDbConnection from "@backend/lib/prepareDbConnection";
import { Db, getConnection } from "typeorm";
import ProjectsPayload from "@backend/common/ProjectsPayload";

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: async ({
    pictures,
    title,
    category,
    description,
    fundTiers,
    currFundGoal,
    launchDate,
    user,
  }: ProjectsPayload["create"]) => {
    await prepareDbConnection();

    const projectInsertResult = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values({
        pictures,
        title,
        category,
        description,
        fundTiers,
        currFundGoal,
        launchDate,
        user,
      })
      .execute();

    return projectInsertResult;
  },

  /**
   * READ: 'GET' request for **ALL** Records
   */
  findAll: async () => {
    await prepareDbConnection();

    const allProjectRows: Project[] = await getConnection()
      .createQueryBuilder()
      .getMany();

    return allProjectRows;
  },

  /**
   * READ: 'GET' request for **ONE Record by ID**
   */
  findById: async () => {},

  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: async () => {},

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: async () => {},

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   */
  filterByCategory: async (category) => {},
};

export default ProjectService;
