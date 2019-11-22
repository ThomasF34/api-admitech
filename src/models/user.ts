import db from '../database/config/database';
import { Model, DataTypes, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import Candidature from './candidature';

class User extends Model {
  public id!: number;
  public email!: string;
  public first_name!: string;
  public last_name!: string;
  public password!: string;
  public role!: string;

  public candidatures!: Candidature[];

  public createCandidature!: HasManyCreateAssociationMixin<Candidature>;
  public getCandidatures!: HasManyGetAssociationsMixin<Candidature>;

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
  last_name: DataTypes.STRING,
  first_name: DataTypes.STRING
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

User.hasMany(Candidature, { as: 'candidatures' });

export = User;
