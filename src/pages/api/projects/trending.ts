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
        //Get all trending projects
        case 'GET': projectController.getTrendingProjects(req, res);
        default: console.log(req.body);
    }
}