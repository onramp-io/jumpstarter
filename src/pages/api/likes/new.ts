import type { NextApiRequest, NextApiResponse } from 'next';
import likesController from '../../../backend/controller/like/like';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Add new user to database if user does not already exist
    if (req.method === 'POST') {
        likesController.addNewLike(req, res);
    } else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}