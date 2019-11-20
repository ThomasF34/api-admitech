import Candidature from '../models/candidature';
import PastYearExp from '../models/pastyearexp';
import Attachment from '../models/attachment';
import User from '../models/user';
import logger from '../helpers/logger';
import experiencesController from './experiences';
import { Op } from 'sequelize';

async function getAll(): Promise<Candidature[]> {
  return Candidature.findAll({
    attributes: ['id', 'status', 'branch', 'first_name', 'last_name'],
    where: {
      status: {
        [Op.gte]: 2,
      }
    }
  });
}


function getById(id: number, role: string): Promise<Candidature> {
  let options = {};
  switch (role) {
    case 'eleve':
      options = {
        attributes: {
          exclude: ['admin_comment']
        },
        include: [
          {
            model: PastYearExp,
            as: 'experiences',
            attributes: ['id', 'degree', 'facility_name', 'facility_place', 'mean', 'name', 'ranking', 'rating', 'year']
          }, {
            model: Attachment,
            as: 'attachments',
            attributes: ['id', 'attach_type', 'key']
          }]
      };
      break;
    case 'administration':
      options = {
        include: [
          {
            model: PastYearExp,
            as: 'experiences',
            attributes: ['id', 'degree', 'facility_name', 'facility_place', 'mean', 'name', 'ranking', 'rating', 'year']
          }, {
            model: Attachment,
            as: 'attachments',
            attributes: ['id', 'attach_type', 'key']
          }]
      };
      break;
    default:
      options = { limit: 0 };
      break;
  }

  return Candidature.findByPk(id, options);
}

async function createCandidature(user: User, params: any): Promise<Candidature | checkError[]> {
  const [valid, errs] = isValid(params);
  if (valid) {
    const attachments = params.attachments;
    const experiences = params.experiences;
    delete params.attachments;
    delete params.experiences;
    return user!.createCandidature(params)
      .then(async cand => {
        //We need to create each attachment and experiences
        const promises: Promise<Attachment | PastYearExp>[] = [];

        if (attachments !== undefined) promises.push(attachments.map((attach: any) => cand.createAttachment(attach)));
        if (experiences !== undefined) promises.push(experiences.map((exp: any) => cand.createExperience(exp)));

        await Promise.all(promises);

        return cand;
      })
      .catch(err => {
        logger.error(['Error while creating an application', err]);
        throw err;
      });
  } else {
    return errs;
  }
}

async function updateCandidature(cand: Candidature, params: any): Promise<Candidature | checkError[]> {
  const [valid, errs] = isValid(params);
  if (valid) {
    // should update experiences. Attachments are updated through document routes
    await Promise.all(params.experiences.map(async (exp: any) => {
      const pastYearExp = await PastYearExp.findByPk(parseInt(exp.id));
      if (pastYearExp !== null) return experiencesController.updateExperience(pastYearExp, exp);
    }));

    delete params.experiences;
    delete params.attachments;

    return cand.update(params);
  } else {
    return errs;
  }
}

async function updateStatus(cand: Candidature, newStatus: number): Promise<Candidature> {
  return await cand.update({ status: newStatus });
}

interface checkError {
  id: string,
  error: string
}

function isValid(reqBody: any): [boolean, checkError[]] {
  if (reqBody.status === 1) {
    return [true, []];
  } else {
    let errs: checkError[] = [];

    // Check if all information are correct

    // Mandatory fields
    const mandatory = ['first_name', 'last_name', 'phone', 'first_name', 'last_name', 'nationnality', 'birth_date', 'birth_place', 'family_status', 'address', 'postal_code', 'city', 'state', 'bac_name', 'bac_year', 'bac_mention', 'bac_realname', 'last_facility_name', 'last_facility_address', 'last_facility_postal_code', 'last_facility_city', 'last_facility_state', 'native_lang_name', 'first_lang_name', 'first_lang_level', 'internships', 'travels', 'it_knowledge', 'sports_interests', 'strengths', 'other_apply', 'branch', 'certified'];

    errs = errs.concat(verifyMandatoryFields(reqBody, mandatory, 'Ce champ est obligatoire'));

    // Coherent language level and name
    ['second', 'third'].forEach(prefix => {
      if (
        (hasProperty(reqBody, `${prefix}_lang_name`) && !hasProperty(reqBody, `${prefix}_lang_level`)) ||
        (!hasProperty(reqBody, `${prefix}_lang_name`) && hasProperty(reqBody, `${prefix}_lang_level`))
      ) {
        errs.push({ id: `${prefix}_lang_name`, error: 'Vous devez entrer un niveau et un nom pour cette langue' });
      }
    });

    // Other application
    if (<boolean>reqBody.other_apply) {
      errs = errs.concat(
        verifyMandatoryFields(reqBody, ['other_apply_name', 'other_apply_place', 'other_apply_apprentise'], 'Vous avez indiqué que vous avez d\'autre(s) candidature(s). Ce champ est donc obligatoire')
      );
    }

    return errs.length === 0 ? [true, []] : [false, errs];
  }
}

const hasProperty = (obj: any, field: string) => Object.prototype.hasOwnProperty.call(obj, field);

const verifyMandatoryFields = (obj: any, mandatories: string[], message: string): checkError[] => {
  return mandatories
    .filter(field => !Object.prototype.hasOwnProperty.call(obj, field))
    .map((missingField: string) => {
      return {
        id: missingField,
        error: message
      };
    });
};

export = { getAll, getById, createCandidature, updateCandidature, updateStatus }