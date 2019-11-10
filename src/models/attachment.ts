import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class Attachment extends Model {
  private id!: number;
  public attach_type!: string;
  public url!: string;
}

Attachment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  attach_type: {
    type: DataTypes.STRING,
  },
  url: {
    type: DataTypes.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

export = Attachment