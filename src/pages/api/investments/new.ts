import type { NextApiRequest, NextApiResponse } from 'next';
import investementsController from '../../../backend/controller/investment/investment';

type Data = {
    name: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    //Add new user to database if user does not already exist
    switch(req.method) {
        case 'POST': investementsController.addNewInvestment(req, res);
        default: console.log(req.body);
    }
}