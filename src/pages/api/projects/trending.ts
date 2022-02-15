import type { NextApiRequest, NextApiResponse } from 'next';
import projectController from '../../../backend/controller/project/project';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Get all trending projects
    if (req.method === 'GET') {
        projectController.getTrendingProjects(req, res); 
    } 
    else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}