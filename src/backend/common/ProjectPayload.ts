import { Comment } from "@backend/entities/Comment";
import { Investment } from "@backend/entities/Investment";
import { Like } from "@backend/entities/Like";
import { User } from "@backend/entities/User";

export type sortByStringType = "createdDate" | "likesAmt" | "userId";

export interface ProjectPayloadInterface {
  create: {
    pictures: string[];
    title: string;
    category: string;
    description: string;
    fundTiers: number[];
    currFundGoal: number;
    user: User;
    // Is launchdate required soon as proj is being created?
    // if not, pls remove the next line.
    launchDate: string;
  };

  findAll: undefined;

  findById: {
    id: string;
  };

  updateById: {
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

  deleteById: {
    id: string;
  };

  sortBy: {
    // TODO: (Tapa) Add fields as needed for recommendation algorithm
    column: sortByString;
  };
}

const ProjectPayload: ProjectPayloadInterface = {
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
