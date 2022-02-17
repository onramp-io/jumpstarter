import type { NextApiRequest, NextApiResponse } from 'next';
import userController from '../../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Get all projects associated with user
        case 'GET': userController.getUserProjects(req, res);
        //Create new project
        case 'POST': userController.createProject(req, res);
        default: console.log(req.body);
    }
}
