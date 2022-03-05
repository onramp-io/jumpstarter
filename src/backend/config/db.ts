import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Investment } from '../entities/Investment';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Category } from '../entities/Category';

let connectionReadyPromise: Promise<Connection> | null = null;

const connection = async () => {
  if (!connectionReadyPromise) {
    connectionReadyPromise = (async () => {
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

  return connectionReadyPromise;
};

export default connection;
