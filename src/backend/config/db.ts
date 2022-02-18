import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from '../entity/User';
import { Project } from '../entity/Project';
import { Investment } from '../entity/Investment';
import { Interest } from '../entity/Interest';
import { Comment } from '../entity/Comment';
import { Like } from '../entity/Like';

//create typeorm database connection using ormconfig.json file
const connection = async () => {
  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {
    // no stale connection to clean up
  }
  const temp = await createConnection({
    type: process.env.DB_TYPE as any,
    url: process.env.DB_CONNECTION_STRING,
    // logging: true, //statements/queries console logged to terminal -> should remove when not debugging
    synchronize: true, //will tralslate logic to sql
    entities: [User, Project, Investment, Comment, Like, Interest],
  });
  if (getConnection().isConnected) {
    console.log('type orm db connected');
    return getConnection();
  }
};

export default connection;
