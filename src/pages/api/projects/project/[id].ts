import type { NextApiRequest, NextApiResponse } from 'next';
import projectController from '../../../../backend/controller/project/project';

type Data = {
  name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Get single project
    if (req.method === 'GET') {
        projectController.getProject(req, res);
    }
    //Update project
    if (req.method === 'PUT') {
        projectController.updateProject(req, res);
    }
    //Delete project
    if (req.method === 'DELETE') {
        projectController.deleteProject(req, res);
    }
    else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}
