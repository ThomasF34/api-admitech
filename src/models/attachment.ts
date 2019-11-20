import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';

class Attachment extends Model {
  private id!: number;
  public attach_type!: string;
  public key!: string;
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
  key: {
    type: DataTypes.STRING
  }
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

export = Attachment