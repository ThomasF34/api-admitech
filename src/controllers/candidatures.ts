import Candidature from '../models/candidature';
import PastYearExp from '../models/pastyearexp';
import Attachment from '../models/attachment';
import User from '../models/user';
import logger from '../helpers/logger';
import experiencesController from './experiences';

async function getAll(): Promise<Candidature[]> {
  return Candidature.findAll({
    attributes: ['status', 'branch', 'first_name', 'last_name'],
    where: {
      draft: false
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
            attributes: ['id', 'attach_type', 'url']
          }]
      };
      break;
    case 'administration':
      options = {
        include: [
          {
            model: PastYearExp,
            as: 'experiences',
            attributes: ['degree', 'facility_name', 'facility_place', 'mean', 'name', 'ranking', 'rating', 'year']
          }, {
            model: Attachment,
            as: 'attachments',
            attributes: ['attach_type', 'url']
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

interface checkError {
  id: string,
  error: string
}

function isValid(reqBody: any): [boolean, checkError[]] {
  if (reqBody.status === 'brouillon') {
    return [true, []];
  } else {
    let errs: checkError[] = [];

    // Check if all information are correct TODO
    // errs.push({ id: 'first_name', error: 'Une erreur' });

    return errs.length === 0 ? [true, []] : [false, errs];
  }
}

export = { getAll, getById, createCandidature, updateCandidature }