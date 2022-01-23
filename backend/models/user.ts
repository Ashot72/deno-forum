import { DataTypes, Model } from "../deps.ts";
import { Forum, Post, Topic } from "./index.ts";

class User extends Model {
  static table = "user";

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  /*
        Does not work
        static defaults = {
            email: 'ashota@gmail.com',
            password: "adminpassword",
            role: "Admin"
        }
    */
  static forums() {
    return this.hasMany(Forum);
  }

  static topics() {
    return this.hasMany(Topic);
  }

  static posts() {
    return this.hasMany(Post);
  }
}

export default User;
