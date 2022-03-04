import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Investment } from '../entities/Investment';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Category } from '../entities/Category';

import chalk from 'chalk';
/**
 * 
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
    logging: true,
    cache: {
      duration: 30000, // 30 seconds
    },
    entities: [User, Project, Investment, Comment, Like, Category],
  });
  if (getConnection().isConnected) {
    return getConnection();
  }
};
 * 
 */

let connectionReadyPromise: Promise<Connection> | null = null;

const connection = async () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
      // clean up old connection that references outdated hot-reload classes
      try {
        const staleConnection = getConnection();
        await staleConnection.close();
      } catch (error) {
        // no stale connection to clean up
      }

      // wait for new default connection
      await createConnection({
        type: process.env.DB_TYPE as any,
        url: process.env.DB_CONNECTION_STRING,
        synchronize: true,
        logging: true,
        cache: {
          duration: 30000, // 30 seconds
        },
        entities: [User, Project, Investment, Comment, Like, Category],
      });
      return getConnection();
    })();
  }

  // return getConnection();
  return connectionReadyPromise;
};

export default connection;
