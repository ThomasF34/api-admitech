
import Entretien from '../models/entretien';

function entretienByCandidature(idCanditature: number): Promise<Entretien> {
  return Entretien.findOne({
    where: {
      candidature_id: idCanditature
    }
  });
}

export = { entretienByCandidature }