import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
class Candidature extends Model {
  private id!: number;
  public fname!: string;
  public lname!: string;
  public familySituation!: string;
  public birthdate!: Date;
  public email!: string;
  public phone!: string;
}

Candidature.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fname: DataTypes.STRING,
  lname: DataTypes.STRING,
  familySituation: DataTypes.STRING,
  birthdate: DataTypes.DATE,
  email: DataTypes.STRING,
  phone: DataTypes.STRING
}, {
  timestamps: true,
  freezeTableName: true,
  sequelize: db
});

export = Candidature
