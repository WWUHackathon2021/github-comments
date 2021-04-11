import { DataTypes, Model, Sequelize } from "sequelize";
import Comment from "../api/types/Comment";

export function defineCommentModel(sequelize: Sequelize) {
  return sequelize.define<Model<Comment, Partial<Comment>>>("Comment", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: true,
    },
    repoID: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    parent: {
      type: DataTypes.INTEGER,
    },
    created: {
      type: DataTypes.TEXT,
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
