import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';

export class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public role!: string;
  public isActive!: boolean;
  public failedAttempts!: number;
  public lockUntil!: Date | null;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'CUSTOMER' },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    failedAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
    lockUntil: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, tableName: 'users', timestamps: true }
);