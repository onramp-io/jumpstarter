import type { NextApiRequest, NextApiResponse } from 'next';
import projectController from '../../../../backend/controller/project/project';

type Data = {
  name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Get single project
        case 'GET': projectController.getProject(req, res);
        //Update project
        case 'PUT': projectController.updateProject(req, res);
        //Delete project
        case 'DELETE': projectController.deleteProject(req, res);
        default: console.log(req.body);
    }
}
