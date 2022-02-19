import type { NextApiRequest, NextApiResponse } from "next";
import { getConnection } from "typeorm";
import { Project } from "../../entities/Project";

// CREATE: post >> create (New)
// READ: get >> findAll, findById
// UPDATE: put >> updateById
// DESROY: delete >> deleteById

// note: the variable names (projectName, projectCreator, ..) are just test names
// -- they'll eventually be changed to reflect our DB schema

// PROJECT CONTROLLER
const createNewProject = async (req: NextApiRequest, res: NextApiResponse) => {
  // (1) extract data from req.body
  const { projectName, projectCreator } = req.body;

  // (2) pass extracted data to service layer (Service layer meaning:
  // our own helper functions that handle db communications (CRUD)
  // or utility functions from a 3rd party API.
  // and then save data returned by that service to a variable ("serviceResponse")
  /**
   * `serviceResponse` === a new User record in this case
   */
  const serviceResponse = createProjectService(projectName, projectCreator);
  // (3) Return service response (e.g. passed in user parameters, we return a new user record)
  return serviceResponse;

  // (4) From the Frontend components, if we need to GET this data,
  // we make an axios.get('/api/projects') ...
  // - then destructure API data from response,
  // - save it to State / Context slices
  // - then display it on UI (if we need to)
};

/** 
 // (3) Send that data back to the UI through our own API
 res.send({
   statusCode: 201,
   payload: serviceResponse,
 });
 * 
 */
const getTrendingProjects = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.send("API CALL: Get trending projects");
};

const getProjectsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.send("API CALL: Get projects by category");
};

const getProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("API CALL: Get project");
};

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("API CALL: Update project");
};

const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send("API CALL: Delete project");
};

export default {
  getNewProjects,
  getTrendingProjects,
  getProjectsByCategory,
  getProject,
  updateProject,
  deleteProject,
};
