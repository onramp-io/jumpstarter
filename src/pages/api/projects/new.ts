import type { NextApiRequest, NextApiResponse } from 'next';
import projectController from '../../../backend/controller/project/project';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Get all new projects
        case 'GET': projectController.getNewProjects(req, res);
        default: console.log(req.body);
    }
}
