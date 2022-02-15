import type { NextApiRequest, NextApiResponse } from 'next';
import userController from '../../../../backend/controller/user/user';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Get specified user
    if (req.method === 'GET') {
        userController.getUser(req, res); 
    } 
    //Update specified user data
    if (req.method === 'PUT') {
        userController.updateUser(req, res);
    }else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}
