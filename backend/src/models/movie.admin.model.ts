import { DataTypes, Model } from 'sequelize';
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database.ts';

export class Movie extends Model<
  InferAttributes<Movie>,
  InferCreationAttributes<Movie>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare synopsis: string;
  declare durationMinutes: number;
  declare genre: string;
  declare rating: string;
  declare status: CreationOptional<'cartelera' | 'proximamente' | 'finalizada'>;
  declare releaseDate: CreationOptional<string | null>;
  declare posterUrl: CreationOptional<string | null>;
}

Movie.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING(150), allowNull: false },
    synopsis: { type: DataTypes.TEXT, allowNull: false },
    durationMinutes: { type: DataTypes.INTEGER, allowNull: false },
    genre: { type: DataTypes.STRING(60), allowNull: false },
    rating: { type: DataTypes.STRING(10), allowNull: false },
    status: {
      type: DataTypes.ENUM('cartelera', 'proximamente', 'finalizada'),
      allowNull: false,
      defaultValue: 'proximamente',
    },
    releaseDate: { type: DataTypes.DATEONLY, allowNull: true },
    posterUrl: { type: DataTypes.STRING(255), allowNull: true },
  },
  { sequelize, tableName: 'movies' },
);