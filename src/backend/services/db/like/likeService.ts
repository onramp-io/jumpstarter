import { getRepository, getConnection } from 'typeorm';
import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@backend/entities/User';
import { Project } from '@backend/entities/Project';
import { Like } from '@backend/entities/Like';
import connection from '@backend/config/db';
import { DatabaseError, NotFoundError } from 'helpers/ErrorHandling/errors'
import { dbError } from "helpers/ErrorHandling/messaging";

enum UpdateLike { Increment = ' + 1', Decrement = ' - 1' }

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
            updateLikeAmt(UpdateLike.Decrement, db, projectId);
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
            throw new DatabaseError(dbError);
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
            throw new DatabaseError(dbError);
        }

        try {
            //decrement like amount
            updateLikeAmt(UpdateLike.Decrement, db, projectId);
        }
        catch {
            throw new DatabaseError(dbError);
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
            throw new DatabaseError(dbError);
        }
    }
}

const updateLikeAmt = async (selector, db, projectId) => {

    const setString = '"likesAmt"';

    await db.createQueryBuilder()
        .select()
        .update(Project)
        .set({
            likesAmt: () => `${setString + selector}`
        })
        .where("id = :id", { id: projectId })
        .execute()
}

export default likeService;