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
        //Get specified user
        case 'GET': userController.getUser(req, res);
        //Update specified user data
        case 'PUT': userController.updateUser(req, res);
        default: console.log(req.body);
    }
}
