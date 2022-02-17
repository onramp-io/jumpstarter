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
    if (req.method === 'POST') {
        investementsController.addNewInvestment(req, res);
    } else {
        console.log(req.body);
    // Handle any other HTTP method
    }
}