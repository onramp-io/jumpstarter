import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Investment } from '@backend/entities/Investment';
import connection from '@backend/config/db';

//Add a like to a project by a user
export const addNewInvestment = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const db = await connection();
    //Add investment to investment table and associate with userID and ProjectId
    const investment = await db
      .createQueryBuilder()
      .insert()
      .into(Investment)
      .values([
        {
          user: req.body.userId,
          project: req.body.projectId,
          fundAmt: req.body.fundAmt,
        },
      ])
      .execute();

    //Increment user invested_amt
    const userFund = await db
      .createQueryBuilder()
      .select()
      .update(User)
      .set({ investedAmt: () => `"investedAmt" + ${req.body.fundAmt}` })
      .where('id = :id', { id: req.body.userId })
      .execute();

    //Increment project fund_raised
    const projFund = await db
      .createQueryBuilder()
      .select()
      .update(Project)
      .set({ fundRaised: () => `"fundRaised" + ${req.body.fundAmt}` })
      .where('id = :id', { id: req.body.projectId })
      .execute();

    res.status(200).json(investment);
  } catch (error) {
    let message;
    if (error instanceof Error) message = error.message;
    console.log(message); //debug
    res.status(500).json(message);
  }
};

// Get all investments for a user
export const getUserInvestments = async (email: string) => {
  const db = await connection();
  const userInvestments = await db
    .createQueryBuilder()
    .select('investment.id', 'investmentId')
    .addSelect('investment.fundAmt', 'fundAmt')
    .addSelect('project.id', 'projectId')
    .addSelect('project.title', 'projectTitle')
    .addSelect('project.description', 'projectDescription')
    .from(Investment, 'investment')
    .innerJoin(Project, 'project', 'investment.projectId = project.id')
    .innerJoin(User, 'user', 'investment.userId = user.id')
    .where('user.email = :email', { email })
    .getRawMany();
  return userInvestments;
};
