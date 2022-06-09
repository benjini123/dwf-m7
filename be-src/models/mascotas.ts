import { Model, DataTypes } from "sequelize";
import { sequelize } from "../lib/sequelize";

export class Mascota extends Model {}
Mascota.init(
  {
    name: DataTypes.STRING,
    state: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  },
  {
    sequelize,
    modelName: "mascota",
  }
);
