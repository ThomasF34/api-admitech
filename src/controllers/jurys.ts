import Jury from '../models/jury';

function assignJuryToEntretien(idEntretien: number, idUser: number): Promise<Jury> {
  const elemToUpdate = {
    user_id: idUser,
    entretien_id: idEntretien
  };
  return Jury.create(elemToUpdate);
}

function setNoteAndComment(note: number, comment: number, idEntretien: number, idUser: number): Promise<[number, Jury[]]> {
  const elemToUpdate = {
    note: note,
    comment: comment

  };
  return Jury.update(elemToUpdate, {
    where: {
      user_id: idUser,
      entretien_id: idEntretien
    }
  });
}

export = { assignJuryToEntretien, setNoteAndComment };