import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize";

export class Auth extends Model {}

Auth.init(
  {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  },
  {
    sequelize,
    modelName: "auth",
  }
);
