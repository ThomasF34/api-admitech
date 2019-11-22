import db from '../database/config/database';
import { Model, DataTypes } from 'sequelize';
import User from './user';
import Entretien from './entretien';

class jury extends Model {
  public entretien_id!: number;
  public user_id!: number;
  public note!: number;
  public comment!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

jury.init({
  entretien_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }, user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  note: {
    type: DataTypes.DECIMAL
  },
  comment: {
    type: DataTypes.STRING
  }
}, {
  underscored: true,
  freezeTableName: true,
  timestamps: true,
  sequelize: db
});

User.belongsToMany(Entretien, { through: jury } );
Entretien.belongsToMany(User, { through: jury } );
export = jury;