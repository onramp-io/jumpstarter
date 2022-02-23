import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
	StatusCodes
} from 'http-status-codes';

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
    try {
        switch(req.method) {
            //Add new like given by user to project
            case 'POST':
                const response = await likeController.create(req)
                res.status(StatusCodes.OK).json(response);
                break;
            default: console.log(req.body);
        }
    }
    catch (error) {
        res.status(error.code).json(error.message);
    }
}

export default handler;