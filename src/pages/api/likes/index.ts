import type { NextApiRequest, NextApiResponse } from 'next';
import likeController from '@backend/controller/like/like';
import {
	StatusCodes
} from 'http-status-codes';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch(req.method) {
        //Add new like given by user to project
        case 'POST':
            likeController.create(req)
            .then((response) => {
            if (response.status == "success") {
                res.status(StatusCodes.OK).json(response.data);
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response.err);
            }
            });
        break;
        default: console.log(req.body);
    }
}