import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Investment } from '../entities/Investment';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Category } from '../entities/Category';

import chalk from 'chalk';

//create typeorm database connection using ormconfig.json file
const connection = async () => {
  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {}

  const temp = await createConnection({
    type: process.env.DB_TYPE as any,
    url: process.env.DB_CONNECTION_STRING,
    synchronize: true,
    cache: true,
    entities: [User, Project, Investment, Comment, Like, Category],
  });
  if (getConnection().isConnected) {
    return getConnection();
  }
};

export default connection;
