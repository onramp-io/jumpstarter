import type { NextApiRequest, NextApiResponse } from 'next';
import { addNewInvestmentController } from '../../../backend/controller/investment/investment';

type Data = {
    name: string;
};

interface Request extends NextApiRequest {
    user: any;
}

export default function handler(
    req: Request,
    res: NextApiResponse<Data>
) {
    //Add new user to database if user does not already exist
    switch(req.method) {
        case 'POST': addNewInvestmentController(req, res);
        default: console.log(req.body);
    }
}