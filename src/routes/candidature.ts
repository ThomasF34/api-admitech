import { Request, Response, Router } from 'express';
import candidatureController from '../controllers/candidatures';
import Candidature from '../models/candidature';
import User from '../models/user';
import checkJwt from '../middlewares/auth.middleware';
import logger from '../helpers/logger';

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
  const userId: number = res.locals.user.id;
  try {
    if (role !== 'administration' && role !== 'eleve') {
      res
        .status(403)
        .send('Vous n\'avez pas accès à la ressource demandée');
    } else {
      const id: number = parseInt(req.params.id);
      const candidature: Candidature = await candidatureController.getById(id, role);
      if (candidature === null) res.status(404).json(`La candidature ${id} n'a pas été trouvée`);
      else if (candidature.UserId !== userId) res.status(403).json('Les élèves ne peuvent accéder qu\'à leurs propres candidatures');
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
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //role guard
    if (user!.role !== 'eleve') return res.status(403).send('Vous ne pouvez pas créer une candidature sans être élève');

    try {
      const creationResponse = await candidatureController.createCandidature(user!, params);
      if (creationResponse instanceof Candidature) {
        res.sendStatus(201);
      } else {
        res
          .status(400)
          .json({ errors: creationResponse });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});


export = candidatureRouter;