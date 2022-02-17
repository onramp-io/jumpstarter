import type { NextApiRequest, NextApiResponse } from 'next';
import userController from '../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Add new user to database if user does not already exist
        case 'POST': userController.addNewUser(req, res);
        default: console.log(req.body);
    }
}
