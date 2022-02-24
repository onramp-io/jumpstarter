import { getRepository, getConnection } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Like } from '@backend/entities/Like';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'

const likeService = {
    //Add a like to a project by a user
    create: async (body) => {
        const { userId, projectId } = body;
        if ((userId == null) || (projectId == null)) {
            throw ("Either userId or projectId is NULL");
        }
        const db = await connection();

        try {
        const like = await db.createQueryBuilder()
            .insert()
            .into(Like)
            .values([
                { user: userId, project: projectId },
            ])
            .execute()
            return like;
        } 
        catch {
            throw new DatabaseError('Database connection failed');
        }
    }
}

export default likeService;