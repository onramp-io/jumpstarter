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

const addProject = (project: any, adjacencyMatrix: Map<any, any>) => {
  adjacencyMatrix.set(project.category, [
    {
      id: project.id,
      title: project.title,
      category: project.category,
      points: 0,
    },
  ]);
  return adjacencyMatrix;
};

const addPoints = (
  id: number,
  category: string,
  point: number,
  adjacencyMatrix: Map<any, any>
) => {
  adjacencyMatrix.get(category).forEach((categoryProject) => {
    if (id != categoryProject.id) {
      categoryProject.points += point;
    }
  });
  return adjacencyMatrix;
};

const parseData = (allProjects: any, adjacencyMatrix: Map<any, any>): Map<any, any> => {
  // Add all projects to the adjacency matrix by category
  allProjects.forEach((project) => {
    const { category } = project;
    if (!adjacencyMatrix.has(category)) {
      addProject(project, adjacencyMatrix);
    } else {
      adjacencyMatrix.get(category).push({
        id: project.id,
        title: project.title,
        category: category,
        points: 0,
      });
    }
  });
  return adjacencyMatrix;
};

export const getRecommendation = (params: any) => {
  const { allProjects, invested, liked, commented } = params;

  let adjacencyMatrix = new Map();
  parseData(allProjects, adjacencyMatrix);
  populateAdjacencyMatrix();

  // Add points to the adjacency matrix by liked category projects
  liked.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 1, adjacencyMatrix);
  });

  // Add points to the adjacency matrix by commented category projects
  commented.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 2, adjacencyMatrix);
  });

  // Add points to the adjacency matrix by investment category projects
  invested.forEach((project) => {
    const { id, category } = project;
    addPoints(id, category, 3, adjacencyMatrix);
  });

  console.log('adjacencyMatrix', adjacencyMatrix);

  return adjacencyMatrix;
};
