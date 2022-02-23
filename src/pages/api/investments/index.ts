import type { NextApiRequest, NextApiResponse } from 'next';
import investmentController from '../../../backend/controller/investment/investmentController';
import {
	StatusCodes
} from 'http-status-codes';

interface Request extends NextApiRequest {
    user: any;
}

export default function handler(
    req: Request,
    res: NextApiResponse
) {
    //Add new user to database if user does not already exist
    switch(req.method) {
        case 'POST':
            investmentController.create(req)
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