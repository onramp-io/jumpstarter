import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Investment } from '@backend/entities/Investment';
import connection from '@backend/config/db';
import { connectAuthEmulator } from 'firebase/auth';

const investmentService = {
    //Add investment made by user to project
    /* curr_fund_goal will point to the index of the fund_tiers array that the project has reached
       For exmample:
        if curr_fund_goal = 0, then project has not met any goals, they are striving for fund_tiers[1]
        if curr_fund_goal = 1, then project has met goal fund_tier[1], they are now striving for fund_tier[2]
    */
    create: async (body) => {
        const { userId, projectId, fundAmt } = body;
        try {
            let currFundGoal = 0;
            let fundTiers = [];
            let fundRaised = 0;

            const db = await connection();
            //Add investment to investment table and associate with userID and ProjectId
            const investment = await db.createQueryBuilder()
                .insert()
                .into(Investment)
                .values([{ user: userId, project: projectId, fundAmt: fundAmt }])
                .execute()

            //Increment project fund_raised
            const projFund = await db.createQueryBuilder()
                .select()
                .update(Project)
                .set({ fundRaised: () => `"fundRaised" + ${fundAmt}` })
                .where("id = :id", { id: projectId })
                .returning(['fundRaised', 'fundTiers', 'currFundGoal'])
                .execute()

            currFundGoal = projFund.raw[0].currFundGoal;
            fundRaised = projFund.raw[0].fundRaised;
            fundTiers = projFund.raw[0].fundTiers;

            const data = moveMilestoneAndPayoutUser(currFundGoal, fundTiers, fundRaised, fundAmt);

            //Increment user invested_amt and balance as necessary
            const userFund = await db.createQueryBuilder()
                .select()
                .update(User)
                .set({
                    investedAmt: () => `"investedAmt" + ${fundAmt}`,
                    balance: () => `"balance" + ${data.userBalance}`
                })
                .where("id = :id", { id: userId })
                .execute()

            //Update project funding milestone and payout amount
            const projUpdate = await db.createQueryBuilder()
                .select()
                .update(Project)
                .set({ currFundGoal: data.newGoal })
                .where("id = :id", { id: projectId })
                .execute()
        
            return { status: "success", data: investment}
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            console.log(message); //debug
            return { status: "failure", err: message}
        }
    }  
}

/*****
Helper function to pay out user as they reach each milestone
and create new fund goal                            
*****/
const moveMilestoneAndPayoutUser = (currFundGoal, fundTiers, fundRaised, fundAmt) => {
    let userBalance = 0;
    let newGoal = currFundGoal;
    let leftOver = 0;

    //increment goal only if last goal not reached
    if (currFundGoal < (fundTiers.length-1) ) {
        //increment goal and pay out user at each milestone until last milestone reached
        while (fundRaised >= fundTiers[newGoal+1]) {
            newGoal++;
            //if user reaches last milestone, pay them anything left in fundAmt+lastmilestone amount
            if (newGoal == (fundTiers.length - 1)) {
                leftOver = (fundRaised - fundTiers[fundTiers.length - 2]);
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
}
    
export default investmentService;