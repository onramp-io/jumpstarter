import { getRepository, getConnection } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Like } from '@backend/entities/Like';
import connection from '@backend/config/db';

const likeService = {
    //Add a like to a project by a user
    create: async (body) => {
        const { userId, projectId } = body;
        try {
            if ((userId == null) || (projectId == null)) {
                throw ("Either userId or projectId is NULL");
            }
            const db = await connection();
            const like = await db.createQueryBuilder()
                .insert()
                .into(Like)
                .values([
                    { user: userId, project: projectId },
                ])
                .execute()
            return { status: "success", data: like}
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            return { status: "failure", err: message}
        }
    }
}

export default likeService;