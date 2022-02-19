import type { NextApiRequest, NextApiprojectData } from "next";
import projectController from "../../../backend/controller/project/project";

type projectData = {
  name: string;
};

// PROJECT ROUTER
export default function handler(
  req: NextApiRequest,
  res: NextApiprojectData<Data>
) {
  let projectData;
  switch (req.method) {
    // CREATE
    case "POST":
      if (projectData) {
        projectData = projectController.createProject(req);
        res.status(201).json(projectData); // 201 - CREATED
      } else {
        res.status(404).json({ message: "Project not created" });
      }
      break;

    // READ
    case "GET":
      projectData = projectController.readProjects(req);
      res.status(200).json(projectData);
      break;

    // UPDATE
    case "PUT":
      projectData = projectController.updateProjects(req);
      res.status(200).json(projectData);

    // DESTROY
    case "DELETE":
      projectData = projectController.destroyProject(req);
      res.status(200).json(projectData);

    // METHOD NOT ALLOWED
    default:
      res.status(405).end();
      break;
  }
}
