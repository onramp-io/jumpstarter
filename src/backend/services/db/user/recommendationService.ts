/**
 * * Graph helper methods to add projects and points to the matrix
 */

interface IParams {
  allProjects: {
    id: number;
    title: string;
    description: string;
    category: string;
    firstName: string;
    lastName: string;
  }[];
  invested: {
    id: number;
    title: string;
    description: string;
    category: string;
    firstName: string;
    lastName: string;
  }[];
  liked: {
    id: number;
    title: string;
    description: string;
    category: string;
    firstName: string;
    lastName: string;
  }[];
  commented: {
    id: number;
    title: string;
    description: string;
    category: string;
    firstName: string;
    lastName: string;
  }[];
}

interface IProject {
  id: number;
  title: string;
  description: string;
  category: string;
  firstName: string;
  lastName: string;
}

const addProject = (
  project: IProject,
  matrix: Map<any, any>
): Map<any, any> => {
  matrix.set(project.category, [
    {
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      firstName: project.firstName,
      lastName: project.lastName,
      points: 0,
    },
  ]);
  return matrix;
};

const addPoints = (
  id: number,
  category: string,
  point: number,
  matrix: Map<any, any>
): Map<any, any> => {
  matrix.get(category).forEach((categoryProject) => {
    if (id != categoryProject.id) {
      categoryProject.points += point;
    }
  });
  return matrix;
};

/**
 * * Setting up graph by adding new nodes i.e categories and edges i.e projects + points
 */

const parseData = (
  allProjects: IParams['allProjects'],
  matrix: Map<any, any>
): Map<any, any> => {
  allProjects.forEach((project) => {
    const { category } = project;
    if (!matrix.has(category)) {
      addProject(project, matrix);
    } else {
      matrix.get(category).push({
        id: project.id,
        title: project.title,
        category: project.category,
        description: project.description,
        firstName: project.firstName,
        lastName: project.lastName,
        points: 0,
      });
    }
  });
  return matrix;
};

/**
 * * Add points to the adjacency matrix by liked, commented, invested category projects
 */

const populateMatrix = (
  matrix: Map<any, any>,
  params: IParams
): Map<any, any> => {
  const { invested, liked, commented } = params;
  liked.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 1, matrix);
  });

  commented.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 2, matrix);
  });

  invested.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 3, matrix);
  });
  return matrix;
};

/**
 * * Rank the projects of each category by points
 * * Return the top 10 projects of all categories ranked by points
 */

const rankProjects = (matrix: Map<any, any>) => {
  const rankedProjects = [];
  matrix.forEach((categoryProjects) => {
    const sortedProjects = categoryProjects.sort((a, b) => {
      return b.points - a.points;
    });
    rankedProjects.push(sortedProjects);
  });
  return rankedProjects.flat().sort((a, b) => {
    return b.points - a.points;
  });
};

export const getRecommendation = (params: IParams) => {
  const { allProjects } = params;
  const adjacencyMatrix = new Map();

  parseData(allProjects, adjacencyMatrix);
  populateMatrix(adjacencyMatrix, params);
  const recommendedProjects = rankProjects(adjacencyMatrix);

  return recommendedProjects.slice(0, 4);
};
