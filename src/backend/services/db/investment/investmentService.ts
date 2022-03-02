import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Investment } from '@backend/entities/Investment';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors';

const InvestmentsDbService = {
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

  //Add investment made by user to project
  /* curr_fund_goal will point to the index of the fund_tiers array that the project has reached
        For exmample:
        if curr_fund_goal = 0, then project has not met any goals, they are striving for fund_tiers[1]
        if curr_fund_goal = 1, then project has met goal fund_tier[1], they are now striving for fund_tier[2]
    */
  create: async (body) => {
    const { userId, projectId, fundAmt } = body;
    let currFundGoal = 0;
    let fundTiers = [];
    let fundRaised = 0;
    let projectOwnerId = 0;

    const db = await connection();

    try {
      //Increment project fundRaised
      const projFund = await db
        .createQueryBuilder()
        .select()
        .update(Project)
        .set({ fundRaised: () => `"fundRaised" + ${fundAmt}` })
        .where('id = :id', { id: projectId })
        .returning(['fundRaised', 'fundTiers', 'currFundGoal', 'user'])
        .execute();

      currFundGoal = projFund.raw[0].currFundGoal;
      fundRaised = projFund.raw[0].fundRaised;
      fundTiers = projFund.raw[0].fundTiers;
      projectOwnerId = projFund.raw[0].userId;
    } catch {
      throw new DatabaseError('Database connection failed');
    }

    try {
      //Increment user investedAmt
      const userFund = await db
        .createQueryBuilder()
        .select()
        .update(User)
        .set({
          investedAmt: () => `"investedAmt" + ${fundAmt}`,
        })
        .where('id = :id', { id: userId })
        .execute();
    } catch {
      throw new DatabaseError('Database connection failed');
    }

    //figure out how much money the project owner can be paid out
    const data = moveMilestoneAndPayoutUser(
      currFundGoal,
      fundTiers,
      fundRaised,
      fundAmt
    );

    console.log(projectOwnerId);

    try {
      //Increment project owner balance as necessary
      const userFund = await db
        .createQueryBuilder()
        .select()
        .update(User)
        .set({
          balance: () => `"balance" + ${data.userBalance}`,
        })
        .where('id = :id', { id: projectOwnerId })
        .execute();
    } catch {
      throw new DatabaseError('Database connection failed');
    }

    try {
      //Update project current funding milestone
      const projUpdate = await db
        .createQueryBuilder()
        .select()
        .update(Project)
        .set({ currFundGoal: data.newGoal })
        .where('id = :id', { id: projectId })
        .execute();
    } catch {
      throw new DatabaseError('Database connection failed');
    }

    try {
      //Add investment to investment table and associate with userID and ProjectId
      const investment = await db
        .createQueryBuilder()
        .insert()
        .into(Investment)
        .values([{ user: userId, project: projectId, fundAmt: fundAmt }])
        .execute();
      return investment;
    } catch {
      throw new DatabaseError('Database connection failed');
    }
  },
};

/*****
Helper function to pay out user as they reach each milestone
and create new fund goal                            
*****/
const moveMilestoneAndPayoutUser = (
  currFundGoal,
  fundTiers,
  fundRaised,
  fundAmt
) => {
  let userBalance = 0;
  let newGoal = currFundGoal;
  let leftOver = 0;

  //increment goal only if last goal not reached
  if (currFundGoal < fundTiers.length - 1) {
    //increment goal and pay out user at each milestone until last milestone reached
    while (fundRaised >= fundTiers[newGoal + 1]) {
      newGoal++;
      //if user reaches last milestone, pay them anything left in fundAmt+lastmilestone amount
      if (newGoal == fundTiers.length - 1) {
        leftOver = fundRaised - fundTiers[fundTiers.length - 2];
        if (leftOver > 0) {
          userBalance += leftOver;
        }
        break;
      }
      //if user has already been paid previous milestone amt, they
      //should be paid the difference between the current and last milestone
      else {
        userBalance += fundTiers[newGoal] - fundTiers[newGoal - 1];
      }
    }
    //else all milestones have been reached already and user
    //can be paid entire fundAmt
  } else {
    userBalance += fundAmt;
  }

  return { userBalance, newGoal };
};

export default InvestmentsDbService;
