import db from '../database/config/database';
import { Model, DataTypes, HasOneSetAssociationMixin } from 'sequelize';
import Candidature from './candidature';

class Entretien extends Model {
  public id!: number;
  public begining_hour!: Date;
  public ending_hour!: Date;
  public formation!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public candidature_id! : number;
 
}

Entretien.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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



export = Entretien;