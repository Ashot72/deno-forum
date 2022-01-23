import { DataTypes, Model } from "../deps.ts";
import { Post, Topic, User } from "./index.ts";

class Forum extends Model {
  static table = "forum";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  };

  static topics() {
    return this.hasMany(Topic);
  }

  static posts() {
    return this.hasMany(Post);
  }

  static user() {
    return this.hasOne(User);
  }
}

export default Forum;
