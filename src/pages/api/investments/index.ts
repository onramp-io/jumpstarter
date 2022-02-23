import type { NextApiRequest, NextApiResponse } from 'next';
import investmentController from '../../../backend/controller/investment/investmentController';
import {
	StatusCodes,
    getReasonPhrase,
} from 'http-status-codes';

interface Request extends NextApiRequest {
    user: any;
}

const handler = async (req: Request, res: NextApiResponse) => {

    try {
        //Add new user to database if user does not already exist
        switch(req.method) {
            case 'POST':
                const response = investmentController.create(req)
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