import Candidature from '../models/candidature';
import PastYearExp from '../models/pastyearexp';
import Attachment from '../models/attachment';

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
      //TODO Exlude private information
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

export = { getAll, getById }