import { createConnection, getConnection } from "typeorm";
import { User } from './entities/User';
import { Project } from './entities/Project';
import { Investment } from './entities/Investment';
import { Interest } from './entities/Interest';
import { Comment } from './entities/Comment';

//create typeorm database connection using ormconfig.json file
const connection = async () => {
    const temp = await createConnection({
        type: 'postgres',
        url: process.env.CONNECTION_STRING,
        logging: true, //statements/queries console logged to terminal -> should remove when not debugging
        synchronize: true, //will tralslate logic to sql
        entities: [User, Project, Investment, Interest, Comment]
     });
    if (getConnection().isConnected) {
        console.log("type orm db connected");
        return getConnection();
    }
};

export default connection;

