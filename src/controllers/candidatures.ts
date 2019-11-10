import Candidature from '../models/candidature';
import PastYearExp from '../models/pastyearexp';
import Attachment from '../models/attachment';

async function getAll(): Promise<Candidature[]> {
  const candidatures = Candidature.findAll({
    attributes: ['status', 'branch', 'first_name', 'last_name']
  });
  return candidatures;
}


function getById(id: number): Promise<Candidature> {
  return Candidature.findByPk(id, {
    include: [
      {
        model: PastYearExp,
        as: 'experiences',
      }, {
        model: Attachment,
        as: 'attachments'
      }]
  });
}

export = { getAll, getById }