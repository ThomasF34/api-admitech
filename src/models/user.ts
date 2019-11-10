import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class User extends Model {
  private idUser!: number;
  public email!: string;
  public fname!: string;
  public lname!: string;
  public password!: string;
  public role!: string;
}

User.init({
  idUser: {
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
  tableName: 'User',
  timestamps: false,
  freezeTableName: true,
  sequelize: db
});

export = User;
