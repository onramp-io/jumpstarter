import type { NextApiRequest, NextApiResponse } from 'next';
import { getRepository, getConnection } from 'typeorm';
import { User } from '../../model/entities/User';
import { Project } from '../../model/entities/Project';
import { Like } from '../../model/entities/Like';
import connection from '../../model/db';

//Add a like to a project by a user
const addNewLike = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if ((req.body.userId == null) || (req.body.projectId == null)) {
            throw("Either userId or projectId is NULL");
        }
        const db = await connection();
        const like = await db.createQueryBuilder()
                .insert()
                .into(Like)
                .values([
                {user: req.body.userId, project: req.body.projectId},
                ])
                .execute()
        res.status(200).json(like);
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        res.status(500).json(message);
    }
};


export default {addNewLike};