import { createConnection, getConnection } from 'typeorm';
import { User } from '../model/User';
import { Project } from '../model/Project';
import { Investment } from '../model/Investment';
import { Interest } from '../model/Interest';
import { Comment } from '../model/Comment';

//create typeorm database connection using ormconfig.json file
const connection = async () => {
  const temp = await createConnection({
    type: 'postgres',
    url: process.env.DB_URL,
    logging: true, //statements/queries console logged to terminal -> should remove when not debugging
    synchronize: true, //will tralslate logic to sql
    entities: [User, Project, Investment, Interest, Comment],
  });
  if (getConnection().isConnected) {
    console.log('type orm db connected');
    return getConnection();
  }
};

export default connection;
