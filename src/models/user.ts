import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  private id!: number;
  public email!: string;
  public fname!: string;
  public lname!: string;
  public password!: string;
  public role!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  lname: DataTypes.STRING,
  fname: DataTypes.STRING
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

export = User;
