import connection from "@backend/config/db";
import { Project } from "@backend/entities/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";
import {
  createQueryBuilder,
  CustomRepositoryDoesNotHaveEntityError,
  Db,
  getConnection,
  getRepository,
  UpdateQueryBuilder,
} from "typeorm";
import SortByConfig from "@backend/common/SortByConfig";
import index from "pages";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { User } from "@backend/entities/User";
import { DatabaseError, NotFoundError } from "helpers/ErrorHandling/errors";
import chalk from "chalk";
import existInDb from "@backend/utils/existsInDb";

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: async (createParams) => {
    try {
      const db = await connection();

      if (db === undefined || db === null) {
        throw new DatabaseError("Database connection failed");
      }

      const projectInsertResult = db
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values([
          {
            title: createParams.title,
            category: createParams.category,
            description: createParams.description,
            fundTiers: createParams.fundTiers,
            currFundGoal: createParams.currFundGoal,
            fundRaised: createParams.fundRaised,
            launchDate: createParams.launchDate,
            user: () =>
              `(SELECT id FROM public.user WHERE uid = '${createParams.uid}')`,
          },
        ])
        .execute();

      if (projectInsertResult === null || projectInsertResult === undefined) {
        throw new DatabaseError("Project not created. Insert result is falsy.");
      }

      return [projectInsertResult, StatusCodes.CREATED];
    } catch (err) {
      throw err;
    }
  },

  /**
   * // TODO: (Tapa) BS2-114 [BE] Wire up ProjectService.findAllByUser to corresponding Api handler
   * @param findAllByUserParams contains req.user.uid --> uid
   */
  findAllByUser: async (findAllByUserParams) => {
    try {
      const db = await connection();
      if (!db) throw new DatabaseError("Database connection failed");
      const userData = await db
        .createQueryBuilder()
        .select("*")
        .from("project", "project")
        .where(
          `project.user = (SELECT user.id FROM user WHERE user.uid = ${findAllByUserParams.uid})`
        )
        .getRawMany();
      if (!userData) throw new NotFoundError("User not found");
      return userData;
    } catch (err) {
      throw err;
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records
   */
  findAll: async () => {
    try {
      const db = await connection();

      if (db === undefined || db === null) {
        throw new DatabaseError("Database connection failed");
      }

      const allProjectRows: Project[] = await getRepository(Project)
        .createQueryBuilder("project")
        .getMany();

      if (allProjectRows === undefined || allProjectRows === null) {
        throw new NotFoundError("Projects not found");
      }

      return [allProjectRows, StatusCodes.OK];
    } catch (err) {
      throw err;
    }
  },

  /**
   * READ: 'GET' request for **ONE Record by ID**
   */
  findById: async (findByIdParams) => {
    try {
      const db = await connection();

      if (db === undefined || db === null) {
        throw new DatabaseError("Database connection failed");
      }

      const foundProject = await db
        .createQueryBuilder()
        .select("*")
        .from("project", "project")
        .where(`project.id = ${findByIdParams.id}`)
        .getRawOne();
      // .execute(); <-- doesnt work. only works with getRawOne

      if (
        foundProject === null ||
        foundProject === undefined ||
        foundProject.length === 0
      ) {
        throw new DatabaseError("Project not found. Found project is falsy.");
      }
      return [foundProject, StatusCodes.OK];
    } catch (err) {
      throw err;
    }
  },

  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: async (updateByIdParams, id) => {
    try {
      const db = await connection();

      if (!existInDb("project", Project, id)) {
        throw new NotFoundError("Project does not exist");
      }

      const updatedProject = await db
        .createQueryBuilder()
        .update(Project)
        .set(updateByIdParams)
        .where("id = :id", { id })
        .execute();

      if (updatedProject.affected === 1) {
        return [updatedProject, StatusCodes.OK];
      } else {
        throw new NotFoundError(
          `Could not update project (Project not found). ${updatedProject.affected} rows affected.`
        );
      }
    } catch (err) {
      throw err;
    }
  },

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: async (projectId) => {
    try {
      const db = await connection();

      if (!existInDb("project", Project, projectId)) {
        throw new NotFoundError("Project does not exist");
      }
      const deletedProject = await db
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where("id = :id", { id: projectId }) //<--
        .execute();

      if (deletedProject.affected === 1) {
        return [deletedProject, StatusCodes.OK];
      } else {
        throw new NotFoundError(
          `Project not deleted. ${deletedProject.affected} rows affected.`
        );
      }
    } catch (err) {
      throw err;
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   * expects eithe
   */
  sortBy: async (sortByParams) => {
    if (sortByParams === SortByConfig.NEWEST) {
      try {
        // TODO: Add logic for Sorting (@Pran)
      } catch (err) {
        throw err;
      }
    } else if (sortByParams === SortByConfig.TRENDING) {
      try {
        // TODO: Add logic for Trending (@Pran)
      } catch (err) {
        throw err;
      }
    } else if (sortByParams === SortByConfig.RECOMMENDED) {
      try {
        // TODO: Add logic here for Recommended (@Tapa)
      } catch (err) {
        throw err;
      }
    }
  },
};

export default ProjectService;
