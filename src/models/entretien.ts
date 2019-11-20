import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import Candidature from './candidature';

class Entretien extends Model {
  public id!: number;
  public date!: Date;
  public begining_hour!: string;
  public ending_hour!: string;
  public formation!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Entretien.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE
  },
  begining_hour: {
    type: DataTypes.STRING
  },
  ending_hour: {
    type: DataTypes.STRING
  },
  formation: {
    type: DataTypes.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

Entretien.hasOne(Candidature, { as: 'candidature', foreignKey: 'candidature_id'});

export = Entretien;