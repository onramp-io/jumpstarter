import type { NextApiRequest, NextApiResponse } from 'next';
import userController from '../../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Get all projects associated with user
    if (req.method === 'GET') {
        userController.getUserProjects(req, res); 
    } 
    //Create new project
    if (req.method === 'POST') {
        userController.createProject(req, res);
    }else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}
