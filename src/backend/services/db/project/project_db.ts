import connection from "@backend/config/db";
import { Project } from "@backend/entities/User";
import type { NextApiRequest, NextApiResponse } from "next";
import { Request } from "@backend/middleware/verify_request";

// Project SERVICE
export const getProject = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .select("*")
      .from("user", "user")
      .where("email = :email", { email })
      .getRawOne();
    if (userData) {
      res.status(200).json({
        userData,
      });
    } else {
      res.status(404).json({
        message: "Project not found",
      });
    }
  } catch (error) {
    console.log("ERROR: getProject() in project_db.ts", error);
  }
};

export const insertProject = async (firstName, lastName, email) => {
  const db = await connection();
  try {
    const userData = await db
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values([
        {
          first_name: firstName,
          last_name: lastName,
          email: email,
          avatar: "",
          bio: "",
          investedAmt: 0,
        },
      ])
      .execute();
    return userData;
  } catch (error) {
    console.warn(error.message);
  }
};

export const updateProject = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .update(Project)
      .set({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        avatar: req.body.avatar,
        bio: req.body.bio,
      })
      .where("email = :email", { email })
      .execute();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: "Project updated",
      });
    } else {
      res.status(404).json({
        message: "Project not updated",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteProject = async (req: Request, res: NextApiResponse) => {
  const db = await connection();
  try {
    const email = req.user.email;
    const userData = await db
      .createQueryBuilder()
      .delete()
      .from(Project)
      .where("email = :email", { email })
      .execute();
    console.log(userData);
    if (userData) {
      res.status(200).json({
        message: "Project deleted",
      });
    } else {
      res.status(404).json({
        message: "Project not deleted",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
