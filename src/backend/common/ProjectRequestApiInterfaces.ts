import { NextApiRequest } from "next";

export interface CreateParamsInterface {
  title: string;
  category: string;
  description: string;
  fundTiers: number[];
  currFundGoal: number;
  userId: number;
  launchDate?: string;
}

export interface ProjectCreateApiRequest extends NextApiRequest {
  body: CreateParamsInterface;
}

export interface FindByIdParamsInterface {
  id: string;
}

export interface ProjectFindByIdApiRequest extends NextApiRequest {
  body: FindByIdParamsInterface;
}

export interface UpdateByIdParamsInterface {
  project: number;
  pictures?: string[];
  title?: string;
  category?: string;
  description?: string;
  fundTiers?: number[];
  currFundGoal?: number;
  launchDate?: string;
}

export interface ProjectUpdateByIdApiRequest extends NextApiRequest {
  body: UpdateByIdParamsInterface;
}

export interface DeleteByIdParamsInterface {
  id: string;
}

export interface ProjectDeleteByIdApiRequest extends NextApiRequest {
  body: DeleteByIdParamsInterface;
}

export const SortByString = {
  NEWEST: "createdDate",
  TRENDING: "likesAmt", // TODO: (Pran) BS2-113: Add Projects API for Trending Logic
  RECOMMENDED: "user.id",
};

export enum SortByStringEnum {
  NEWEST = "createdDate", // TODO: (Pran) BS2-14 [BE]: Create endpoint to fetch a list of Projects sorted in newest to oldest order
  TRENDING = "likesAmt", // TODO: (Pran) BS2-113 [BE]: Add Projects API for Trending Logic
  RECOMMENDED = "user.id", // TODO: (Tapa) BS2-16 [BE]: Create endpoint to return a list of recommended Projects based on Projects a User has liked/funded
}

export type SortByParamsType = {
  SortByString:
    | SortByStringEnum.NEWEST // TODO: (Pran) BS2-14 [BE]: Create endpoint to fetch a list of Projects sorted in newest to oldest order
    | SortByStringEnum.TRENDING // TODO: (Pran) BS2-113 [BE]: Add Projects API for Trending Logic
    | SortByStringEnum.RECOMMENDED; // TODO: (Tapa) BS2-16 [BE]: Create endpoint to return a list of recommended Projects based on Projects a User has liked/funded
};

export interface ProjectSortByApiRequest extends NextApiRequest {
  body: SortByParamsType;
}
