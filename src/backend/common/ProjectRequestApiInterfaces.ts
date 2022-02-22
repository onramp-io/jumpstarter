import { Comment } from "@backend/entities/Comment";
import { Investment } from "@backend/entities/Investment";
import { Like } from "@backend/entities/Like";
import { User } from "@backend/entities/User";
import { NextApiRequest } from "next";

export type sortByStringType = "createdDate" | "likesAmt" | "userId";

export interface ProjectCreateApiRequest extends NextApiRequest {
  body: {
    createParams: {
      title: string;
      category: string;
      description: string;
      fundTiers: number[];
      currFundGoal: number;
      user: User;
      // Is launchdate required soon as proj is being created?
      // if not, pls remove the next line.
      launchDate?: string;
    };
  };
}

export interface ProjectFindAllApiRequest extends NextApiRequest {
  body: {
    findAllParams: {
      undefined?: undefined | null;
    };
  };
}

export interface ProjectFindByIdApiRequest extends NextApiRequest {
  body: {
    findByIdParams: {
      id: string;
    };
  };
}

export interface ProjectUpdateByIdApiRequest extends NextApiRequest {
  body: {
    updateByIdParams: {
      id: string;
      pictures?: string[];
      title?: string;
      category?: string;
      description?: string;
      fundTiers?: number[];
      currFundGoal?: number;
      comments?: Comment[];
      investments?: Investment[];
      likes?: Like[];
      // Is launchdate required soon as proj is being created?
      // if not, pls remove the next line.
      launchDate?: string;
    };
  };
}

export interface ProjectDeleteByIdApiRequest extends NextApiRequest {
  body: {
    deleteByIdParams: {
      id: string;
    };
  };
}

export interface ProjectSortByApiRequest extends NextApiRequest {
  body: {
    sortByString: sortByStringType;

    sortByParams: {
      column: sortByStringType;
    };
  };
}

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
