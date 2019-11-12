import { Request, Response, Router } from 'express';
import candidatureController from '../controllers/candidatures';
import Candidature from '../models/candidature';
import User from '../models/user';
import checkJwt from '../middlewares/auth.middleware';
import logger from '../helpers/logger';
import Attachment from '../models/attachment';
import PastYearExp from '../models/pastyearexp';
const candidatureRouter = Router();

candidatureRouter.get('/', [checkJwt], async (req: Request, res: Response) => {
  try {
    if (res.locals.user.role !== 'administration') {
      res
        .status(403)
        .send('Vous n\'avez pas accès à la ressource demandée');
    } else {
      const candidatures: Candidature[] = await candidatureController.getAll();
      candidatures.length == 0 ?
        res.sendStatus(204) :
        res
          .status(200)
          .json(candidatures);
    }
  } catch (e) {
    res
      .status(500)
      .json(e.message);
  }
});

candidatureRouter.get('/:id', [checkJwt], async (req: Request, res: Response) => {
  const role: string = res.locals.user.role;
  try {
    if (role !== 'administration' && role !== 'eleve') {
      res
        .status(403)
        .send('Vous n\'avez pas accès à la ressource demandée');
    } else {
      const id: number = parseInt(req.params.id);
      const candidature: Candidature = await candidatureController.getById(id, role);
      if (candidature === null) res.status(404).json(`Candidature ${id} not found`);
      else res.status(200).json(candidature);
    }
  } catch (e) {
    res
      .status(500)
      .json(e.message);
  }
});

candidatureRouter.post('/', [checkJwt], async (req: Request, res: Response) => {
  const params = req.body;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to create an application`);
    res.status(404).send('Utilisateur non trouvé');
  } else {
    //role guard
    if (user!.role !== 'eleve') return res.status(403).send('Vous ne pouvez pas créer une candidature sans être élève');

    const [valid, errs] = isValid(params);
    if (valid) {
      const attachments = params.attachments;
      const experiences = params.experiences;
      delete params.attachments;
      delete params.experiences;
      user!.createCandidature(params)
        .then(async cand => {
          //We need to create each attachment and experiences
          const promises: Promise<Attachment | PastYearExp>[] = [];

          promises.push(attachments.map((attach: any) => cand.createAttachment(attach)));
          promises.push(experiences.map((exp: any) => cand.createExperience(exp)));

          await Promise.all(promises);

          res.status(201).json(cand);
        })
        .catch(err => {
          logger.error(['Error while creating an application', err]);
          res.status(500).send(err.message);
        });
    } else {
      res
        .status(400)
        .json({ errors: errs });
    }
  }
});

interface checkError {
  id: string,
  error: string
}

function isValid(reqBody: any): [boolean, checkError[]] {
  if (<boolean>reqBody.draft) {
    return [true, []];
  } else {
    let errs: checkError[] = [];

    // Check if all information are correct TODO
    errs.push({ id: 'first_name', error: 'Une erreur' });

    return errs.length === 0 ? [true, []] : [false, errs];
  }
}

export = candidatureRouter;