import { DataTypes, Model, Sequelize } from "sequelize";
import Profile from "../api/types/Profile";

export function defineProfileModel(sequelize: Sequelize) {
  return sequelize.define<Model<Profile>>("Profile", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
    },
    realName: {
      type: DataTypes.TEXT,
    },
    avatarURL: {
      type: DataTypes.TEXT,
    },
  });
}

export type ProfileModel = ReturnType<typeof defineProfileModel>;
