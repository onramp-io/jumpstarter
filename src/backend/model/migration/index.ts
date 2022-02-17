import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "../entities/User";

createConnection().then(async connection => {

  console.log("Inserting a new user into the database...");
  const user = new User();
  user.first_name = "Timber";
  user.last_name = "Saw";
  user.email = "Saw";
  user.avatar = "Saw";
  user.bio = "Saw";
  user.invested_amt = 200;
  user.comments = [];
  user.interests = [];
  user.investments = [];

  await connection.manager.save(user);
  console.log("Saved a new user with id: " + user.id);

  console.log("Loading users from the database...");
  const users = await connection.manager.find(User);
  console.log("Loaded users: ", users);

  console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));