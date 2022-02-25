import { createConnection, getConnection, Connection } from "typeorm";
import { User } from "../entities/User";
import { Project } from "../entities/Project";
import { Investment } from "../entities/Investment";
import { Comment } from "../entities/Comment";
import { Like } from "../entities/Like";
import { Category } from "../entities/Category";

import chalk from "chalk";

//create typeorm database connection using ormconfig.json file
const connection = async () => {
  console.log(chalk.green("Connecting to database..."));
  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {
    // no stale connection to clean up
  }

  const temp = await createConnection({
    type: process.env.DB_TYPE as any,
    url: process.env.DB_CONNECTION_STRING,
    //logging: true, //statements/queries console logged to terminal -> should remove when not debugging
    synchronize: true, //will tralslate logic to sql
    entities: [User, Project, Investment, Comment, Like, Category],
  });
  if (getConnection().isConnected) {
    console.log(chalk.green("DB Connected!"));
    return getConnection();
  }
};

export default connection;
