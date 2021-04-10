import { DataTypes, Model, Sequelize } from "sequelize";
import Comment from "../api/types/Comment";

export function defineCommentModel(sequelize: Sequelize) {
  return sequelize.define<Model<Comment>>("Comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    repoID: {
      type: DataTypes.TEXT,
    },
    parent: {
      type: DataTypes.INTEGER,
    },
    created: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
    fullname: {
      type: DataTypes.TEXT,
    },
    profilePictureURL: {
      type: DataTypes.TEXT,
    },
    upvoteCount: {
      type: DataTypes.INTEGER,
    },
  });
}

export type CommentModel = ReturnType<typeof defineCommentModel>;
