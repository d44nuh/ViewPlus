import { DataTypes, Model } from "sequelize";
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "../config/database.ts";

class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare duration: number;
  declare genre: string;
  declare rating: string;
  declare synopsis: string;
  declare posterUrl: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    duration: { type: DataTypes.INTEGER, allowNull: false },
    genre: { type: DataTypes.STRING(60), allowNull: false },
    rating: { type: DataTypes.STRING(10), allowNull: false },
    synopsis: { type: DataTypes.TEXT, allowNull: false },
    posterUrl: { type: DataTypes.STRING(255), allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { sequelize, tableName: "movies" },
);

export default Movie;