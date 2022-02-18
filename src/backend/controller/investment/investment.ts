import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { Project } from '../../entity/Project';
import { Investment } from '../../entity/Investment';
import connection from '../../config/db';

//Add a like to a project by a user
const addNewInvestment = async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connection();
  try {
    console.log('userID: ' + req.body.userId); //debug
    console.log('ProjectID: ' + req.body.projectId); //debug

    //Add investment to investment table and associate with userID and ProjectId
    const investment = await db
      .createQueryBuilder()
      .insert()
      .into(Investment)
      .values([
        {
          user: req.body.userId,
          project: req.body.projectId,
          fundAmt: req.body.fund_amt,
        },
      ])
      .execute();

    //Increment user invested_amt
    const userFund = await db
      .createQueryBuilder()
      .select()
      .update(User)
      .set({ investedAmt: () => 'investedAmt + `%${req.body.fund_amt}%`' })
      .where('id = :id', { id: req.body.userId })
      .execute();

    //Increment project fund_raised
    const projFund = await db
      .createQueryBuilder()
      .select()
      .update(Project)
      .set({ fundRaised: () => 'fundRaised + `%{req.body.fund_amt}%`' })
      .where('id = :id', { id: req.body.projectId })
      .execute();
    await db.close();

    console.log(investment); //debug
    console.log(userFund); //debug
    console.log(projFund); //debug

    res.json(investment);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    await db.close();
    console.log(message); //debug
    res.json(message);
  }
};

export default { addNewInvestment };
