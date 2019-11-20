import db from '../database/config/database';
import { Model, DataTypes, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import PastYearExp from './pastyearexp';
import Attachment from './attachment';

class Candidature extends Model {
  public id!: number;
  public phone!: string;
  public draft!: boolean;
  public first_name!: string;
  public last_name!: string;
  public nationnality!: string;
  public birth_date!: Date;
  public birth_place!: string;
  public family_status!: string;
  public address!: string;
  public postal_code!: string;
  public city!: string;
  public state!: string;
  public bac_name!: string;
  public bac_year!: Date;
  public bac_mention!: string;
  public bac_realname!: string;
  public last_facility_name!: string;
  public last_facility_address!: string;
  public last_facility_postal_code!: string;
  public last_facility_city!: string;
  public last_facility_state!: string;
  public native_lang_name!: string;
  public first_lang_name!: string;
  public second_lang_name!: string;
  public third_lang_name!: string;
  public first_lang_level!: string;
  public second_lang_level!: string;
  public third_lang_level!: string;
  public internships!: string;
  public travels!: string;
  public it_knowledge!: string;
  public sports_interests!: string;
  public strengths!: string;
  public other_apply!: boolean;
  public other_apply_name!: string;
  public other_apply_place!: string;
  public other_apply_apprentise!: boolean;
  public candidate_comment!: string;
  public admin_comment!: string;
  public status!: number;
  public branch!: string;
  public certified!: boolean;
  public certified_at!: Date;
  public created_at!: Date;
  public updated_at!: Date;

  public UserId!: number;

  public createAttachment!: HasManyCreateAssociationMixin<Attachment>;
  public createExperience!: HasManyCreateAssociationMixin<PastYearExp>;
  public getAttachments!: HasManyGetAssociationsMixin<Attachment>;
}

Candidature.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phone: DataTypes.STRING,
  draft: DataTypes.BOOLEAN,
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  nationnality: DataTypes.STRING,
  birth_date: DataTypes.DATEONLY,
  birth_place: DataTypes.STRING,
  family_status: DataTypes.STRING,
  address: DataTypes.STRING,
  postal_code: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  bac_name: DataTypes.STRING,
  bac_year: DataTypes.INTEGER,
  bac_mention: DataTypes.STRING,
  bac_realname: DataTypes.STRING,
  last_facility_name: DataTypes.STRING,
  last_facility_address: DataTypes.STRING,
  last_facility_postal_code: DataTypes.STRING,
  last_facility_city: DataTypes.STRING,
  last_facility_state: DataTypes.STRING,
  native_lang_name: DataTypes.STRING,
  first_lang_name: DataTypes.STRING,
  second_lang_name: DataTypes.STRING,
  third_lang_name: DataTypes.STRING,
  first_lang_level: DataTypes.STRING,
  second_lang_level: DataTypes.STRING,
  third_lang_level: DataTypes.STRING,
  internships: DataTypes.TEXT,
  travels: DataTypes.TEXT,
  it_knowledge: DataTypes.TEXT,
  sports_interests: DataTypes.TEXT,
  strengths: DataTypes.TEXT,
  other_apply: DataTypes.BOOLEAN,
  other_apply_name: DataTypes.STRING,
  other_apply_place: DataTypes.STRING,
  other_apply_apprentise: DataTypes.BOOLEAN,
  candidate_comment: DataTypes.TEXT,
  admin_comment: DataTypes.TEXT,
  status: DataTypes.INTEGER,
  branch: DataTypes.STRING,
  certified: DataTypes.BOOLEAN,
  certified_at: DataTypes.DATE,
}, {
  underscored: true,
  timestamps: true,
  sequelize: db
});

Candidature.hasMany(PastYearExp, { as: 'experiences' });
Candidature.hasMany(Attachment, { as: 'attachments' });

export = Candidature
