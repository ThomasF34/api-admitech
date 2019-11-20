import Entretien from '../models/entretien';
import logger from '../helpers/logger';

function entretienByCandidature(idCanditature: number): Promise<Entretien> {
  return Entretien.findOne({
    where: {
      candidature_id: idCanditature
    }
  });
}

function getAllEntretiensAvailableForFormation(formation: string): Promise<Entretien[]> {
  return Entretien.findAll({
    where: {
      'candidature_id': null,
      formation: formation
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

async function addEntretien(ele: Entretien): Promise<Entretien> {
  const elemToCreate = {
    begining_hour: ele.begining_hour,
    ending_hour: ele.ending_hour,
    formation:ele.formation,
    created_at: ele.created_at,
    updated_at: ele.updated_at
  };
  try {
    const entretien = await Entretien.create(elemToCreate);
    return entretien;
  }
  catch (err) {
    logger.error(['Error while creating an application', err]);
    throw err;
  };
}

function updateEntretien(ele: Entretien,id: string): Promise<[number, Entretien[]]> {
  const elemToUpdate = {
    begining_hour: ele.begining_hour,
    ending_hour: ele.ending_hour,
    formation:ele.formation,
    created_at: ele.created_at,
    updated_at: ele.updated_at
  };
  return Entretien.update(elemToUpdate, {
    where: {
      id: id
    }
  });
}

function deleteEntretien(idE: string): Promise<number> {
  return Entretien.destroy({
    where: {
      id: idE
    }
  });
}
  



export = { entretienByCandidature, getEntretienById, assignCandidatureToEntretien, getAllEntretiensAvailableForFormation, addEntretien, updateEntretien, deleteEntretien }