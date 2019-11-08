import Candidature from '../models/candidature';

function getAll(): Promise<Candidature[]> {
  return Candidature.findAll();
}


function getById(id: number): Promise<Candidature> {
  return Candidature.findByPk(id);
}

export = { getAll, getById }