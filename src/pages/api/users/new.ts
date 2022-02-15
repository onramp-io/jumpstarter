import type { NextApiRequest, NextApiResponse } from 'next';
import userController from '../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Add new user to database if user does not already exist
    if (req.method === 'POST') {
        userController.addNewUser(req, res);
    } else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}
