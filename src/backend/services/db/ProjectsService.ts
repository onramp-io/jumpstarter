import connection from "@backend/config/db";
import { Project } from "@backend/entities/Project";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";

const ProjectService = {
  /**
   * CREATE: 'POST' request to **Insert ONE Record**
   */
  create: () => {},

  /**
   * READ: 'GET' request for **ALL** Records
   */
  findAll: () => {},

  /**
   * READ: 'GET' request for **ONE Record by ID**
   */
  findById: () => {},

  /**
   * UPDATE: 'PUT' request for ONE Record by ID
   */
  updateById: () => {},

  /**
   * DESTROY: 'DELETE' request for ONE Record by ID
   */
  deleteById: () => {},

  /**
   * READ: 'GET' request for **ALL** Records of a Particular Category
   */
  filterByCategory: (category) => {},
};

export default ProjectService;
