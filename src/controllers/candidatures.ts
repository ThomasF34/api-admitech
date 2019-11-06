import Candidature from '../models/candidature';

function getAll(): Promise<Candidature[]> {
  return Candidature.findAll();
}

export = { getAll }