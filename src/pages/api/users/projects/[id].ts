import type { NextApiRequest, NextApiResponse } from 'next';
//import userController from '../../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Get all projects associated with user
        case 'GET':
        //Create new project
        case 'POST':
        default: console.log(req.body);
    }
}
