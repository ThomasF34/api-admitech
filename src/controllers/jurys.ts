import Jury from '../models/jury';

function assignJuryToEntretien(idEntretien: number, idUser: number): Promise<Jury> {
  const elemToUpdate = {
    user_id: idUser,
    entretien_id: idEntretien
  };
  return Jury.create(elemToUpdate);
}

export = { assignJuryToEntretien };