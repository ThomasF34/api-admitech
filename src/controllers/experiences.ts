
import PastYearExp from '../models/pastyearexp';

function updateExperience(experience: PastYearExp, params: any): Promise<PastYearExp> {
  return experience.update(params);
}

export = { updateExperience };