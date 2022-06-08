import { Model, DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export class User extends Model {}
User.init(
  {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    mascotas: DataTypes.JSON,
  },
  {
    sequelize,
    modelName: "user",
  }
);
