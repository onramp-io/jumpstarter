import { createQueryBuilder, getConnection } from "typeorm";
import connection from "@backend/config/db";
import chalk from "chalk";

const existInDb = async function (
  entityName: string,
  entity,
  id: number
): Promise<boolean> {
  const db = await getConnection();
  const result = await db
    .createQueryBuilder()
    .select("*")
    .from(entity, entityName)
    .where(`${entityName}.id = ${id}`)
    .getRawOne();

  return result !== undefined;
};

export default existInDb;
