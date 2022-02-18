import type { NextApiRequest, NextApiResponse } from 'next';
import { getConnection } from 'typeorm';
import { Project } from '../../entities/Project';

const getNewProjects = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Get new projects');
};

const getTrendingProjects = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.send('API CALL: Get trending projects');
};

const getProjectsByCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.send('API CALL: Get projects by category');
};

const getProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Get project');
};

const updateProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Update project');
};

const deleteProject = async (req: NextApiRequest, res: NextApiResponse) => {
  res.send('API CALL: Delete project');
};

export default {
  getNewProjects,
  getTrendingProjects,
  getProjectsByCategory,
  getProject,
  updateProject,
  deleteProject,
};
