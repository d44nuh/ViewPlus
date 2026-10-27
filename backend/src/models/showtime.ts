import { DataTypes, Model } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.ts";
import Auditorium from "./auditorium.ts";
import Movie from "./movie.ts";

class Showtime extends Model<
  InferAttributes<Showtime>,
  InferCreationAttributes<Showtime>
> {
  declare id: CreationOptional<number>;
  declare movieId: number;
  declare auditoriumId: number;
  declare startTime: Date;
  declare endTime: Date;
}

Showtime.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Movie, key: "id" },
      onDelete: "CASCADE",
    },
    auditoriumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Auditorium, key: "id" },
      onDelete: "CASCADE",
    },
    startTime: { type: DataTypes.DATE, allowNull: false },
    endTime: { type: DataTypes.DATE, allowNull: false },
  },
  { sequelize, tableName: "showtimes" },
);

export default Showtime;