import connection from "@backend/config/db";
import Project from "@backend/entities/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";
import prepareDbConnection from "@backend/lib/prepareDbConnection";
import { createQueryBuilder, CustomRepositoryDoesNotHaveEntityError, Db, getConnection, UpdateQueryBuilder } from "typeorm";
import { ProjectPayloadInterface, sortByString, sortByStringType } from "@backend/common/ProjectPayload"; from "@backend/common/ProjectPayload";
import ProjectPayload, { CreateParamsInterface, DeleteByIdParamsInterface, FindAllParamsInterface, FindByIdParamsInterface, UpdateByIdParamsInterface, SortByParamsInterface, SortByParamsType } from "@backend/common/ProjectRequestApiInterfaces";
import SortByConfig from "@backend/common/SortByConfig";
import index from "pages";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

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
  create: async (createParams: CreateParamsInterface) => {
    try {
      await prepareDbConnection();
      // toss in reusable helper function if same pattern exactly followed
      const projectInsertResult = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Project)
        .values(createParams)
        .execute();
        
        if (projectInsertResult !== null && projectInsertResult !== undefined) {
          // return projectInsertResult; // return both projInsertResult AND status code [projectInsertResult, statusCode]
          return [projectInsertResult, StatusCodes.OK];
        } else {
          throw new Error('Project not created');
        }
      } catch (err) {
        return [null, StatusCodes.INTERNAL_SERVER_ERROR];
        // TODO: Add DB layer error handling here! --> do status code 500
        // console.warn(err.message); // remove <<--- only for local debugging
// distributed tracing - in prod --> all instances at runtime - sends out event log
      }
    },
    
    /**
     * READ: 'GET' request for **ALL** Records
     */
    findAll: async (findAllParams: FindAllParamsInterface) => {
      try {
        await prepareDbConnection();
        const allProjectRows: Project[] = await getConnection()
        .createQueryBuilder()
        .getMany(); // way to paginate .. findAll not in prod! cache gives u ids that are most relevant!! backend worker job on interval (Cron?) -- pieces of code, automated run on interval, message queue on AWs, every 15 mins... any language! run on its own! something waiting on result to capture! cron job 15 db with new values
        if (allProjectRows !== null && allProjectRows !== undefined) {
          return [allProjectRows, StatusCodes.OK];
        } else {
          throw new Error('Projects not found');
        }
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
    findById: async (findByIdParams: FindByIdParamsInterface) => {
      try {
        await prepareDbConnection();
        const foundProject = await createQueryBuilder()
        .where("project.id = :id", findByIdParams)
        .getOne();

        // handle errors here
        if (foundProject === null || foundProject === undefined) {
          throw new Error('Project not found');
        }
        return [foundProject, StatusCodes.OK];
      } catch (err) {
        return [null, StatusCodes.INTERNAL_SERVER_ERROR];
      }
    },
    
  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: async (updateByIdParams: UpdateByIdParamsInterface) => {
    try {
      await prepareDbConnection();
      const updatedProject = await createQueryBuilder()
        .update(Project)
        .set(updateByIdParams) // <-- this is where we pass in the params we want to update records with
        .where("id = :id", { id: updateByIdParams.id })
        .execute();
      
      if (updatedProject === null || updatedProject === undefined) {
        throw new Error('Could not update Project');
      }

      return [updatedProject, StatusCodes.OK]
    } catch (err) {
      // Don't log errors in production.
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: async (deleteByIdParams: DeleteByIdParamsInterface) => {
    try {
      // refactor prepareDbConnection to @backend/config/db function
      await prepareDbConnection();

      const deletedProject = await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Project)
        .where("id = :id", { id: deleteByIdParams.id })
        .execute();

      if (deletedProject !== null && deletedProject !== undefined) {
        return [deletedProject, StatusCodes.];
      } else {
        throw new Error('Project not deleted');
      }
    } catch (err) {
      return [null, StatusCodes.INTERNAL_SERVER_ERROR];
    }
  },

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   * expects eithe
   */
  sortBy: async (
    sortByParams
  ) => {
    if (sortByParams === SortByConfig.NEWEST) {
      try {
        await prepareDbConnection();

        const newestProjectsFirst = await getConnection()
          .createQueryBuilder(Project, 'projects')
          .leftJoinAndSelect('projects.createdAt', 'createdAt')
          .orderBy('createdAt', 'ASC')
          .getMany();

        if (newestProjectsFirst !== null && newestProjectsFirst !== undefined) {
          return [newestProjectsFirst, StatusCodes.OK];
        } else {
          throw new Error('Projects could not be sorted by createdAt')
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
