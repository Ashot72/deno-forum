import { DataTypes, Model } from "../deps.ts";
import { Forum, Topic, User } from "./index.ts";

class Post extends Model {
  static table = "post";
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

  static forum() {
    return this.hasOne(Forum);
  }

  static topic() {
    return this.hasOne(Topic);
  }

  static user() {
    return this.hasOne(User);
  }

  static posts() {
    return this.hasMany(Post);
  }

  static users() {
    return this.hasMany(Post);
  }
}

export default Post;
