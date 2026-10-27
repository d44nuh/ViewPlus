import { DataTypes, Model } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.ts";

class Auditorium extends Model<
  InferAttributes<Auditorium>,
  InferCreationAttributes<Auditorium>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare capacity: number;
}

Auditorium.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, tableName: "auditoriums" },
);

export default Auditorium;