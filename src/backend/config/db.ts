import { createConnection, getConnection, Connection } from 'typeorm';
import { User } from '../entities/User';
import { Project } from '../entities/Project';
import { Investment } from '../entities/Investment';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Category } from '../entities/Category';
import {
	StatusCodes,
	getReasonPhrase,
} from 'http-status-codes';
import { jsError } from '@backend/config/errorTypes';

//create typeorm database connection using ormconfig.json file
const connection = async () => {
  try {
    const staleConnection = getConnection();
    await staleConnection.close();
  } catch (error) {
    // no stale connection to clean up
  }

  try {
    const temp = await createConnection({
      type: process.env.DB_TYPE as any,
      url: process.env.DB_CONNECTION_STRING,
      //logging: true, //statements/queries console logged to terminal -> should remove when not debugging
      synchronize: true, //will tralslate logic to sql
      entities: [User, Project, Investment, Comment, Like, Category],
    });
    if (getConnection().isConnected) {
      return getConnection();
    }
  }
  catch {
    throw new jsError(
      StatusCodes.INTERNAL_SERVER_ERROR, 
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR), 
      "Database is not connected")
  }
};

export default connection;
