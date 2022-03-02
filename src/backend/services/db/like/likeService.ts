import { getRepository, getConnection } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Like } from '@backend/entities/Like';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'
import { dbError } from "helpers/ErrorHandling/messaging";


const likeService = {
    //Add a like to a project by a user
    create: async (body) => {
        const { userId, projectId } = body;
        if ((userId == null) || (projectId == null)) {
            throw ("Either userId or projectId is NULL");
        }
        const db = await connection();

        try {
            //Increment project likesAmt
            const projectLikes = await db.createQueryBuilder()
                .select()
                .update(Project)
                .set({
                    likesAmt: () => `"likesAmt" + 1`
                })
                .where("id = :id", { id: projectId })
                .execute()
        }
        catch {
            throw new DatabaseError(dbError);
        }

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
                throw new DatabaseError(dbError);
            }
    },

    getLike: async (query, user) => {
        const projectId = query.id;
        const { uid } = user;

        const db = await connection();

        try {
            const projectLikes = await db
                .createQueryBuilder()
                .select("*")
                .from(Like, 'like')
                .innerJoin(User, 'user', 'like.userId = user.id')
                .where('user.uid = :uid', { uid })
                .andWhere('like.projectId = :projectId', { projectId })
                .getRawOne();
            
            return projectLikes;
        }
        catch {
            throw new DatabaseError('Database connection failed');
        }
    },

    deleteLike: async (query, user) => {
        const projectId = query.id;
        const { uid } = user;
        let userId = 0;

        const db = await connection();

        try {
            const userData = await db
                .createQueryBuilder()
                .select("*")
                .from("user", "user")
                .where("uid = :uid", { uid })
                .getRawOne();

            userId = userData.id;
        }
        catch {
            throw new DatabaseError('Database connection failed');
        }

        try {
            //Decrement project likesAmt
            const projectLikes = await db.createQueryBuilder()
                .select()
                .update(Project)
                .set({
                    likesAmt: () => `"likesAmt" - 1`
                })
                .where("id = :id", { id: projectId })
                .execute()
        }
        catch {
            throw new DatabaseError('Database connection failed');
        }

        try {
            const projectLikes = await db
                .createQueryBuilder()
                .delete()
                .from(Like)
                .where('userId = :userId', { userId })
                .andWhere('projectId = :projectId', { projectId })
                .execute();
            
            return projectLikes;
        }
        catch {
            throw new DatabaseError('Database connection failed');
        }
    }
}

export default likeService;