import { Database, Relationships } from "../deps.ts";
import { Forum, Post, Topic, User } from "../models/index.ts";
import { registerUser } from "../services/user.service.ts";

export let Like: any;

const link = async (db: Database) => {
  Relationships.belongsTo(Forum, User);

  Relationships.belongsTo(Topic, Forum);
  Relationships.belongsTo(Topic, User);
  
  Relationships.belongsTo(Post, Forum);
  Relationships.belongsTo(Post, User);
  Relationships.belongsTo(Post, Topic);

  Like = Relationships.manyToMany(Post, User);

  db.link([User, Forum, Topic, Post, Like]);

  try {
    await registerUser({
      email: "admin@gmail.com",
      password: "adminpassword",
      role: "Admin",
    });
  } catch (e) {
    try {
      await db.sync();
    }catch(err) {
       // console.log("User Error!:", err.message)
    }
  }
};

export { link };
