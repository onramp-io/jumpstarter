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
import { dbError, notFoundError } from "helpers/ErrorHandling/messaging";
import { NorthWest } from "@mui/icons-material";

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: async (createParams) => {
    try {
      const db = await connection();

      if (db === undefined || db === null) {
        throw new DatabaseError(dbError);
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
      if (!db) throw new DatabaseError(dbError);
      const userData = await db
        .createQueryBuilder()
        .select("*")
        .from("project", "project")
        .where(
          `project.user = (SELECT user.id FROM user WHERE user.uid = ${findAllByUserParams.uid})`
        )
        .getRawMany();
      if (!userData) throw new NotFoundError(notFoundError);
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
        throw new DatabaseError(dbError);
      }

      const allProjectRows: Project[] = await getRepository(Project)
        .createQueryBuilder("project")
        .getMany();

      if (allProjectRows === undefined || allProjectRows === null) {
        throw new NotFoundError(notFoundError);
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
        throw new DatabaseError(dbError);
      }

      const foundProject = await db
        .createQueryBuilder()
        .select("*")
        .from("project", "project")
        .where(`project.id = ${findByIdParams.id}`)
        .getRawOne();

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

  findProjectUserById: async (findProjectUserByIdParams) => {
    try {
      const db = await connection();
       if (db === undefined || db === null) {
         console.log("db issue")
         throw new DatabaseError('Database connection failed');
       }
      const foundProjectUser = await db
        .createQueryBuilder()
        .select('*')
        .from('user', 'user')
        .where(
          `"user"."id" = (SELECT "project"."userId" FROM "project" WHERE "project"."id" = ${findProjectUserByIdParams.id})`
        )
        .getRawOne();

      if (
        foundProjectUser === null ||
        foundProjectUser === undefined ||
        foundProjectUser.length === 0
      ) {
        throw new DatabaseError('Project user not found. Found project user is falsy.');
      }

      return [foundProjectUser, StatusCodes.OK];
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
        throw new NotFoundError(notFoundError);
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
        throw new NotFoundError(notFoundError);
      }
      const deletedProject = await db
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where("id = :id", { id: projectId })
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
   *
   */
  sortBy: async (query) => {

    if (query.sortType === SortByConfig.NEWEST) {
      try {
        return await getSortedProjects("createdDate");
      } catch (err) {
        throw new DatabaseError(dbError);
      }
    } else if (query.sortType === SortByConfig.TRENDING) {
      try {
        return await getSortedProjects("trendScore");
      } catch (err) {
        throw new DatabaseError(dbError);
      }
    } else if (query.sortType === SortByConfig.RECOMMENDED) {
      try {
        // TODO: Add logic here for Recommended (@Tapa)
      } catch (err) {
        throw err;
      }
    }
  },

  addView: async (query) => {

    const id = query.id;
    const db = await connection();

    try {
      //Increment project views
      const projectViews = await db.createQueryBuilder()
          .select()
          .update(Project)
          .set({
              views: () => `"views" + 1`
          })
          .where("id = :id", { id: id })
          .execute()
    }
    catch {
        throw new DatabaseError(dbError);
    }
  },

  updateTrendScore: async () => {
    const db = await connection();
    try {
      var trendEquation = '("likesAmt"-"likesAmtLast") + ("views"-"viewsLast") + ("fundRaised"-"fundRaisedLast")';
      var trendCondition = "(now() - scoreUpdatedAt) > INTERVAL '5 sec'";

      await db.createQueryBuilder()
          .select()
          .update(Project)
          .set({
              trendScore: () => `${trendEquation}`,
              scoreUpdatedAt: () => `now()`
          })
          .where(`${trendCondition}`)
          .execute()
;    }
    catch {
        throw new DatabaseError(dbError);
    }

  },

  getLikes: async (query) => {
    const id = query.id;
    const db = await connection();

    try {
      //Increment project likesAmt
      const projectLikes = await db
        .createQueryBuilder()
        .select("project.likesAmt", "likesAmt")
        .from(Project, "project")
        .where("id = :id", { id })
        .getRawOne();

      return projectLikes;
      
    }
    catch {
        throw new DatabaseError(dbError);
    }

  }
  
};

//Helper function to sort projects
const getSortedProjects = async (column) => {
  const db = await connection();

  const projectData = await getRepository(Project)
  .createQueryBuilder("project")
  .orderBy(`project.${column}`, 'DESC')
  .getMany();

  return projectData;
}

export default ProjectService;
