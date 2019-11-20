import Entretien from '../models/entretien';

function entretienByCandidature(idCanditature: number): Promise<Entretien> {
  return Entretien.findOne({
    where: {
      candidature_id: idCanditature
    }
  });
}

function getAllEntretiensAvailable(): Promise<Entretien[]> {
  return Entretien.findAll({
    where: {
      'candidature_id': null
    }
  });
}

function getEntretienById(idEntretien: number): Promise<Entretien> {
  return Entretien.findOne({
    where: {
      id: idEntretien
    }
  });
}

function assignCandidatureToEntretien(idEntretien: number, idCanditature: number): Promise<[number, Entretien[]]> {
  const elemToUpdate = {
    candidature_id: idCanditature
  };
  return Entretien.update(elemToUpdate, {
    where: {
      id: idEntretien
    }
  });
}

export = { entretienByCandidature, getEntretienById, assignCandidatureToEntretien, getAllEntretiensAvailable }