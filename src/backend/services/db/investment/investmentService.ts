import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Investment } from '@backend/entities/Investment';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';

export const InvestmentsDbService = {
  getAll: async (uid: string) => {
    const db = await connection();
    if (!db) throw new DatabaseError('Database connection failed');
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
      .where('user.uid = :uid', { uid })
      .getRawMany();
    if (!userInvestments) throw new NotFoundError('User Investments Not found');
    return userInvestments;
  },
};
