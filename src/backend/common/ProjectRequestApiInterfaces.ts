import { Comment } from "@backend/entities/Comment";
import { Investment } from "@backend/entities/Investment";
import { Like } from "@backend/entities/Like";
import { User } from "@backend/entities/User";
import { NextApiRequest } from "next";

export interface CreateParamsInterface {
  title: string;
  category: string;
  description: string;
  fundTiers: number[];
  currFundGoal: number;
  userId: number;
  // Is launchdate required soon as proj is being created?
  // if not, pls remove the next line.
  launchDate?: string;
}

export interface ProjectCreateApiRequest extends NextApiRequest {
  // req.body.createParams.description
  body: CreateParamsInterface;
}

/** 
 * 
 export interface ProjectFindAllParamsInterface {
   undefined?: undefined | null;
 }
 
 export interface ProjectFindAllApiRequest extends NextApiRequest {
   body: {
     findAllParams: ProjectFindAllParamsInterface;
   };
 */
}

export interface FindByIdParamsInterface {
  id: string;
}

export interface ProjectFindByIdApiRequest extends NextApiRequest {
  body: {
    findByIdParams: FindAllParamsInterface;
  };
}

export interface UpdateByIdParamsInterface {
  // id: string; <-- auto passed by query
  pictures?: string[];
  title?: string;
  category?: string;
  description?: string;
  fundTiers?: number[];
  currFundGoal?: number;
  // comments?: Comment[]; <--- take this* out in other files
  // investments?: Investment[]; <-- and this*
  // likes?: Like[]; <-- and this*
  // Is launchdate required soon as proj is being created?
  // if not, pls remove the next line.
  launchDate?: string;
}

export interface ProjectUpdateByIdApiRequest extends NextApiRequest {
  body: {
    updateByIdParams: UpdateByIdParamsInterface;
  };
}

export interface DeleteByIdParamsInterface {
  id: string;
}

export interface ProjectDeleteByIdApiRequest extends NextApiRequest {
  body: {
    deleteByIdParams: DeleteByIdParamsInterface;
  };
}

export const SortByString = {
  NEWEST: "createdDate",
  TRENDING: "likesAmt", // TODO: Add column you want to sort by (instead of "likesAmt") @Pran
  RECOMMENDED: "user.id", // TODO: Add column you want to sort by (instead of "user.id") @Tapa
};

export enum SortByStringEnum {
  NEWEST = "createdDate",
  TRENDING = "likesAmt", // TODO: Add column you want to sort by (instead of "likesAmt") @Pran
  RECOMMENDED = "user.id", // TODO: Add column you want to sort by (instead of "user.id") @Tapa
}
// SortByString.NEWEST
// SortByString.TRENDING
// SortByString.RECOMMENDED

export type SortByParamsType = {
  SortByString:
    | SortByStringEnum.NEWEST
    | SortByStringEnum.TRENDING
    | SortByStringEnum.RECOMMENDED;
};

export interface ProjectSortByApiRequest extends NextApiRequest {
  body: SortByParamsInterface;
}

/** 
 * 
 const ProjectPayload = {
   create: {
     pictures,
     title,
     category,
     description,
     fundTiers,
     currFundGoal,
     user,
     // Is launchdate required soon as proj is being created?
     // if not, pls remove the next line.
     launchDate,
   },
 
   findAll: undefined,
 
   findById: {
     id,
   },
 
   updateById: {
     id,
     pictures,
     title,
     category,
     description,
     fundTiers,
     currFundGoal,
     comments,
     investments,
     likes,
     // Is launchdate required soon as proj is being created?
     // if not, pls remove the next line.
     launchDate,
   },
 
   deleteById: {
     id,
   },
 
   sortBy: {
     // TODO: (Tapa) Add fields as needed for recommendation algorithm
     column,
   },
 };
 
 export default ProjectPayload;
 */
