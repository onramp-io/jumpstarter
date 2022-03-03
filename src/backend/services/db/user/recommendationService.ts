/**
 * * Check the projects and see if the current project's category matches
 * * the project's category the user has liked, invested in, or commented on
 *        - IF current project's category matches the category of a project the user has liked, give 1 points
 *        - IF current project's category matches the category of a project the user has commented on, give 2 points
 *        - IF current project's category matches the category of a project the user has invested in, give 3 points
 * * If the project's category matches the projects the user has liked, invested in, or commented on
 * * add the points to the total points for the project and add the points to the adjacency matrix
 *
 */

const addProject = (project: any, matrix: Map<any, any>): Map<any, any> => {
  matrix.set(project.category, [
    {
      id: project.id,
      title: project.title,
      category: project.category,
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

const parseData = (allProjects: any, matrix: Map<any, any>): Map<any, any> => {
  // Add all projects to the adjacency matrix by category
  allProjects.forEach((project) => {
    const { category } = project;
    if (!matrix.has(category)) {
      addProject(project, matrix);
    } else {
      matrix.get(category).push({
        id: project.id,
        title: project.title,
        category: category,
        points: 0,
      });
    }
  });
  return matrix;
};

const populateAdjacencyMatrix = (
  matrix: Map<any, any>,
  params: any
): Map<any, any> => {
  const { invested, liked, commented } = params;
  // Add points to the adjacency matrix by liked category projects
  liked.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 1, matrix);
  });

  // Add points to the adjacency matrix by commented category projects
  commented.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 2, matrix);
  });

  // Add points to the adjacency matrix by investment category projects
  invested.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 3, matrix);
  });
  return matrix;
};

export const getRecommendation = (params: any) => {
  const { allProjects } = params;

  const adjacencyMatrix = new Map();
  parseData(allProjects, adjacencyMatrix);
  populateAdjacencyMatrix(adjacencyMatrix, params);
  

  console.log('adjacencyMatrix', adjacencyMatrix);

  return adjacencyMatrix;
};
