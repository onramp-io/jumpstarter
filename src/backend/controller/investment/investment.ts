import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../entities/User';
import { Project } from '../../entities/Project';
import { Investment } from '../../entities/Investment';
import connection from '../../config/db';

//Add a like to a project by a user
const addNewInvestment = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const db = await connection();
        //Add investment to investment table and associate with userID and ProjectId
        const investment = await db.createQueryBuilder()
                .insert()
                .into(Investment)
                .values([
                {user: req.body.userId, project: req.body.projectId, fundAmt: req.body.fundAmt},
                ])
                .execute()

        //Increment user invested_amt
        const userFund = await db.createQueryBuilder()
                .select()
                .update(User)
                .set({investedAmt: () => `"investedAmt" + ${req.body.fundAmt}`})
                .where("id = :id", { id: req.body.userId })
                .execute()

        //Increment project fund_raised
        const projFund = await db.createQueryBuilder()
                .select()
                .update(Project)
                .set({fundRaised: () => `"fundRaised" + ${req.body.fundAmt}`})
                .where("id = :id", { id: req.body.projectId })
                .execute()

        res.status(200).json(investment);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        console.log(message); //debug
        res.status(500).json(message);
    }
};

export default { addNewInvestment };
