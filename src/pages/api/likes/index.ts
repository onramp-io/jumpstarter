import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
	StatusCodes,
    getReasonPhrase,
} from 'http-status-codes';

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
    try {
        switch(req.method) {
            //Add new like given by user to project
            case 'POST':
                const response = await likeController.create(req)
                res.status(StatusCodes.OK).json(response);
                break;
            default: res.status(StatusCodes.NOT_FOUND).json(getReasonPhrase(StatusCodes.NOT_FOUND));
        }
    }
    catch (error) {
        res.status(error.code).json(error.message);
    }
}

export default handler;