import { DataTypes, Model } from "../deps.ts";
import { Forum, Post, User } from "./index.ts";

class Topic extends Model {
  static table = "topic";
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
    view: {
      type: DataTypes.INTEGER,
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

  static posts() {
    return this.hasMany(Post);
  }

  static user() {
    return this.hasOne(User);
  }
}

export default Topic;
