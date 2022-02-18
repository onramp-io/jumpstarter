import type { NextApiRequest, NextApiResponse } from 'next';
import { addNewLikeController } from '@backend/controller/like/like';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    switch(req.method) {
        //Add new like given by user to project
        case 'POST': addNewLikeController(req, res); break;
        default: console.log(req.body);
    }
}