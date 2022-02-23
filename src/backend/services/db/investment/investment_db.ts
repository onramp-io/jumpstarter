import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Investment } from '@backend/entities/Investment';
import connection from '@backend/config/db';

export const InvestmentsDbService = {
  create: async (userId: number, projectId: number, fundAmt: number) => {
    try {
      const db = await connection();
      //Add investment to investment table and associate with userID and ProjectId
      const investment = await db
        .createQueryBuilder()
        .insert()
        .into(Investment)
        .values([
          {
            user: userId,
            project: projectId,
            fundAmt: fundAmt,
          },
        ])
        .execute();

      //Increment user invested_amt
      const userFund = await db
        .createQueryBuilder()
        .select()
        .update(User)
        .set({ investedAmt: () => `"investedAmt" + ${fundAmt}` })
        .where('id = :id', { id: userId })
        .execute();

      //Increment project fund_raised
      const projFund = await db
        .createQueryBuilder()
        .select()
        .update(Project)
        .set({ fundRaised: () => `"fundRaised" + ${fundAmt}` })
        .where('id = :id', { id: projectId })
        .execute();
      return investment;
    } catch (error) {
      console.warn(error.message);
    }
  },

  get: async (email: string) => {
    try {
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
      if (!userInvestments) throw new Error('User not found');
      return userInvestments;
    } catch (error) {
      console.warn(error.message);
    }
  },
};
