import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../model/entities/User';
import { Project } from '../../model/entities/Project';
import { Like } from '../../model/entities/Like';
import connection from '../../model/db';

//Add a like to a project by a user
const addNewLike = async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connection();
    try {
        console.log("userID: " + req.body.userId); //debug
        console.log("ProjectID: " + req.body.projectId); //debug
        const like = await db.createQueryBuilder()
                .insert()
                .into(Like)
                .values([
                {user: req.body.userId, project: req.body.projectId},
                ])
                .execute()
        await db.close();
        console.log(like); //debug
        res.json(like);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        await db.close();
        console.log(message); //debug
        res.json(message);
    }
};


export default {addNewLike};