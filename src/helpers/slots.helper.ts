interface Slot {
  beginning: Date,
  end: Date
}

export const makeSlots = (dateDebut: Date, dateFin: Date, duration: number): Array<Slot> => {

  const nbDays = calculateNbDays(dateDebut, dateFin);
  let currentDate = dateDebut;
  const beginHourDay = 8;
  const endHourDay = 18;
  const beginBreak = 12;
  const endBreak = 13;
  let startHour = beginHourDay;

  const nbSlots = calculateNbSlots(beginHourDay, endHourDay, beginBreak, endBreak, duration) * nbDays;
  let slots: Slot[] = [];

  for (let i = 1; i <= nbSlots; i++) {
    if (startHour === beginBreak) {
      startHour = startHour + (endBreak - beginBreak);
    } else {
      if (startHour === endHourDay) {
        let tomorrow = currentDate;
        tomorrow.setDate(tomorrow.getDate() + 1);
        currentDate = tomorrow;
        startHour = beginHourDay;
      }
      const slot: Slot = {
        beginning: new Date(dateDebut.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour + 2, 0, 0, 0),
        end: new Date(dateDebut.getFullYear(), currentDate.getMonth(), currentDate.getDate(), startHour + duration + 2, 0, 0, 0),
      };
      startHour = startHour + 1;
      slots.push(slot);
    }
  }
  return slots;
};

const calculateNbDays = (dateDebut: Date, dateFin: Date): number => {
  const dayB = dateDebut.getDay();
  const dayE = dateFin.getDay();
  return dayE - dayB + 1;
};

const calculateNbSlots = (beginHourDay: number, endHourDay: number, beginBreak: number, endBreak: number, duration: number): number => {

  return (endHourDay - beginHourDay - (endBreak - beginBreak)) / duration;
};