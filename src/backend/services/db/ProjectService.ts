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
import {
  ProjectPayloadInterface,
  sortByString,
  sortByStringType,
} from "@backend/common/ProjectPayload";
import ProjectPayload, {
  CreateParamsInterface,
  DeleteByIdParamsInterface,
  FindAllParamsInterface,
  FindByIdParamsInterface,
  UpdateByIdParamsInterface,
  SortByParamsInterface,
  SortByParamsType,
} from "@backend/common/ProjectRequestApiInterfaces";
import SortByConfig from "@backend/common/SortByConfig";
import index from "pages";
import {
  ReasonPhrases,
  StatusCodes,
  getReasonPhrase,
  getStatusCode,
} from "http-status-codes";
import { User } from "@backend/entities/User";

/** 
 * 
 response
   .status(StatusCodes.OK)
   .send(ReasonPhrases.OK);
 
 response
   .status(StatusCodes.INTERNAL_SERVER_ERROR)
   .send({
     error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
   });
 */

/** 
 * 
 following RESTful API structure:
   create -> post
   read -> get
   update -> put
   destroy -> delete
 
   /pages/entity/index.tsx -- will respond to: 
     - .create( ) POST
     - .findAll( ) GET
   /pages/entity/[entityId].tsx -- will respond to:
     - .findById( ) GET 
     - .updateById( ) PUT 
     - .deleteById( ) DELETE 
     - .sortBy( ) GET
 
 naming conventions for Services & methods:
   filename: /services/EntityService.ts
   EntityService.create( ) ===  CREATE / POST
   EntityService.findAll( ) === READ / GET all rows
   EntityService.findById( ) === READ / GET 1 row
   EntityService.updateById( ) === UPDATE / PUT 1 row
   EntityService.deleteById( ) === DESTROY / DELETE 1 row
   EntityService.sortBy(sortByString, sortByConfig) === READ / GET all rows SORTED 
     - (by createdAt, likesAmt, user.id, -- @Tapa, @Pran for trending, recommended logic)
 
   naming conventions for Controllers:
   filename: /controller/EntityController.ts
   purpose:
   - (0) Only takes in the NextApiRequest as a param (no NextApiResponse in params needed)
   - (1) Extracts/Destructures data from req.body
   - (2) Validates & pre-processes that data if needed
   - (3) Calls the corresponding EntityService.method( ) and passes in that pre-processed data, and saves it** to a variable
   - (4) Returns the saved data** to the NextApiHandler
 
   NextApiHandler
   filename: /pages/api/entity/index.js
   purpose:
   - (1) takes in both the Request (NextApiRequest) and Response (NextApiResponse) as Params
   - (2) contains a try catch block
     - within that try block,
       (i) calls the EntityController.method( ) and passes in the req (NextApiRequest), and saves whatever it returned* to a variable
       (ii) returns that variable*
     - within that catch block,
 
   EntityController.create( ) === calls the EntityService.create( ) method, and returns whatever the EntityService.create( ) method returned
   EntityController.findAll( ) === calls the EntityService.findAll( ) method
   EntityController.findById( ) === 
   EntityController.updateById( ) === 
   EntityController.deleteById( ) === 
   EntityController.sortBy(sortByString, sortByConfig)
 
   naming conventions for static typing params passed into your controller

 */

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: async (createParams) => {
    try {
      console.log(`You're at the ProjectService.create( ) method!`);
      const db = await connection();
      console.log(`db === ${db}`);

      // toss in reusable helper function if same pattern exactly followed
      // returns something - successful query
      // raw: ["how many things inserted"]
      const projectInsertResult = await db
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(createParams) // <-- hardcode from now!
        // .returning(["id"]) // --> PUT,
        // "project.id = :id"
        // "user.uid = :uid"
        /** 
         * 
         .where("uid = :uid", {
           uid: createParams.body.uid,
         })
         */
        /**
         .where("id = :id", {
           id: createParams.id,
         })
         * 
         */
        .execute();

      /** 
         console.log(
           `${JSON.stringify(projectInsertResult)} is the projectInsertResult`
         );
         * 
         */

      if (projectInsertResult === null || projectInsertResult === undefined) {
        throw new Error("Project not created");
      }
      // return projectInsertResult; // return both projInsertResult AND status code [projectInsertResult, statusCode]
      console.log(
        `created the project! it's on pgAdmin! ${JSON.stringify(
          projectInsertResult
        )}.. but it's typeof is ${typeof projectInsertResult}`
      );

      return [projectInsertResult, StatusCodes.CREATED];
    } catch (err) {
      console.warn(err.message);
      throw new Error(
        "Project not created! - check project service catch block"
      );
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
      // TODO: Add DB layer error handling here! --> do status code 500
      // console.warn(err.message); // remove <<--- only for local debugging
      // distributed tracing - in prod --> all instances at runtime - sends out event log
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records
   */
  findAll: async (findAllParams) => {
    try {
      await connection();

      const allProjectRows: Project[] = await getRepository(Project)
        .createQueryBuilder("project")
        .getMany(); // way to paginate .. findAll not in prod! cache gives u ids that are most relevant!! backend worker job on interval (Cron?) -- pieces of code, automated run on interval, message queue on AWs, every 15 mins... any language! run on its own! something waiting on result to capture! cron job 15 db with new values
      console.log(allProjectRows);
      return [allProjectRows, StatusCodes.OK];
      throw new Error("Projects not found - see ProjectService.findAll");
    } catch (err) {
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * same for everyone -- ours
   * ML
   * - weights
   * -significance
   * -algebraic score
   *
   */

  /**
   * take all signals from content presenting
   * - likes?
   * - comments?
   * - engatement?
   * - >>> edges before u and post... how do they add together to create relevancy score
   */
  // trending === snapshot ranking
  // recommended:: (below)
  /**
   * snapshot - calculate delta likes, views
   * score went up by 10 in last half hour; score of ____
   * over threshhold.. over delta of 5 positive direction -- give trending status
   * - take snapshot - 15 mins.. these were values... CRON job looks at delta...
   * sliding window forward.. generic ranking algo.. based on user, likes n interest, how likely are they interested in this proj!
   * - funding... factors.. numerical score...
   *
   */

  /**
   * READ: 'GET' request for **ONE Record by ID**
   */
  findById: async (findByIdParams) => {
    try {
      const db = await connection();

      // get tapa's findById function
      console.log(findByIdParams.id, "is findByIdParams.id");
      const foundProject = await db
        .createQueryBuilder()
        .where("project.id = :id", findByIdParams.id)
        .getOne();

      /** 
       if (foundProject === null || foundProject === undefined) {
         throw new Error("Project not found");
       }
       *  */
      // handle errors here
      return [foundProject, StatusCodes.OK];
    } catch (err) {
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: async (updateByIdParams, id) => {
    console.log(`you're at ProjectService.updateById( )!`);
    console.log(
      `in ProjectService.updateById(), updateByIdParams === ${JSON.stringify(
        updateByIdParams
      )}`
    );
    try {
      const db = await connection();

      console.log(
        `updateByIdParams looks like ==> ${JSON.stringify(updateByIdParams)}`
      );

      const updatedProject = await db
        .createQueryBuilder()
        // .select()
        .update(Project)
        // not matching actual columns
        .set(updateByIdParams) // <-- this is where we pass in the params we want to update records with
        .where("id = :id", { id })
        // .returning() // look into returning entire row
        .execute();

      console.log(`updatedProject === ${JSON.stringify(updatedProject)}`);
      if (updatedProject.affected === 1) {
        console.log(`checking here!!!!!`);
        return [updatedProject, StatusCodes.OK];
      } else {
        console.warn(`updatedProject.affected !== 1 (probably 0)`);
        throw new Error("Could not update Project");
      }
    } catch (err) {
      // Don't log errors in production.
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: async (deleteByIdParams) => {
    try {
      console.log(`you're at the ProjectService.deleteById( ) !`);
      // refactor prepareDbConnection to @backend/config/db function
      const db = await connection();

      console.log(`id is ${deleteByIdParams}`);
      const deletedProject = await db
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where("id = :id", { id: deleteByIdParams }) //<--
        .execute();

      if (deletedProject !== null && deletedProject !== undefined) {
        return [deletedProject, StatusCodes.OK];
      } else {
        throw new Error("Project not deleted");
      }
    } catch (err) {
      console.warn(err.message);
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   * expects eithe
   */
  sortBy: async (sortByParams) => {
    if (sortByParams === SortByConfig.NEWEST) {
      try {
        await prepareDbConnection();

        const newestProjectsFirst = await getConnection()
          .createQueryBuilder(Project, "projects")
          .leftJoinAndSelect("projects.createdAt", "createdAt")
          .orderBy("createdAt", "ASC")
          .getMany();

        if (newestProjectsFirst !== null && newestProjectsFirst !== undefined) {
          return [newestProjectsFirst, StatusCodes.OK];
        } else {
          throw new Error("Projects could not be sorted by createdAt");
        }
      } catch (err) {
        return [null, StatusCodes.INTERNAL_SERVER_ERROR];
      }
    } else if (sortByParams === SortByConfig.TRENDING) {
      // TODO: Add logic for Trending (@Pran) // whole scale
    } else if (sortByParams === SortByConfig.RECOMMENDED) {
      // TODO: Add logic here for Recommended (@Tapa) // needs info from user.. depends on signals they're looking at
    }
  },
};

export default ProjectService;
