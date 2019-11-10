import Candidature from '../models/candidature';
import PastYearExp from '../models/pastyearexp';

async function getAll(): Promise<Candidature[]> {
  const candidatures = Candidature.findAll({
    include: [
      {
        model: PastYearExp,
        as: 'experiences',
      }]
  });
  return candidatures;
}


function getById(id: number): Promise<Candidature> {
  return Candidature.findByPk(id);
}

export = { getAll, getById }