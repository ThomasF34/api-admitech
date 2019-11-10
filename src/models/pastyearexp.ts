import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class PastYearExp extends Model {
  private id!: number;
  public year!: string;
  public name!: string;
  public facility_name!: string;
  public facility_place!: string;
  public degree!: boolean;
  public mean!: number;
  public rating!: string;
  public ranking!: string;
}

PastYearExp.init({
  year: DataTypes.STRING,
  name: DataTypes.STRING,
  facility_name: DataTypes.STRING,
  facility_place: DataTypes.STRING,
  degree: DataTypes.BOOLEAN,
  mean: DataTypes.DECIMAL,
  rating: DataTypes.STRING,
  ranking: DataTypes.STRING
}, {
  underscored: true,
  timestamps: false,
  sequelize: db
});

export = PastYearExp