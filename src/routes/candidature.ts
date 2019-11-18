import { Request, Response, Router } from 'express';
import candidatureController from '../controllers/candidatures';
import Candidature from '../models/candidature';
import User from '../models/user';
import checkJwt from '../middlewares/auth.middleware';
import logger from '../helpers/logger';
import Attachment from '../models/attachment';

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
    delete params.status; //student can see status but cannot update it
    params.status = <boolean>params.draft ? 1 : 2;
  }

  try {
    const creationResponse = await candidatureController.createCandidature(user!, params);
    if (creationResponse instanceof Candidature) {
      res.status(201).json(await candidatureController.getById(creationResponse.id, user!.role));
    } else {
      res
        .status(400)
        .json({ errors: creationResponse });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

candidatureRouter.put('/:id', [checkJwt], async (req: Request, res: Response) => {
  const params = req.body;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  const id = req.params.id;
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to create an application`);
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //role guards
    if (!['eleve', 'administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration et un élève peuvent modifier une candidature');
    const cand = await candidatureController.getById(parseInt(id), user!.role);
    if (cand === null) return res.status(404).json(`La candidature ${id} n'a pas été trouvée`);
    else if (user!.role === 'eleve') {
      if (cand.UserId !== userId) return res.status(403).json('Les élèves ne peuvent accéder qu\'à leurs propres candidatures');
      if (![1, 3].includes(cand.status)) return res.status(403).json('Vous ne pouvez pas mettre à jour votre candidature si celle si est déjà transmise');
      delete params.status; //student can see status but cannot update it
    }
    if (cand.status === 1 && !(<boolean>params.draft)) params.status = 'transmis';
    //end of guards

    try {
      const updateResponse = await candidatureController.updateCandidature(cand, params);
      if (updateResponse instanceof Candidature) {
        res.sendStatus(200);
      } else {
        res
          .status(400)
          .json({ errors: updateResponse });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

candidatureRouter.delete('/:candId/document/:attachId', [checkJwt], async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  const attachId = req.params.attachId;
  const candId = req.params.candId;
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to delete an attachment`);
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //role guards
    const cand = await candidatureController.getById(parseInt(candId), user!.role);
    if (cand === null) return res.status(404).json(`La candidature ${candId} n'a pas été trouvée`);
    if (!['eleve', 'administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration et un élève peuvent supprimer des pièces jointes');
    else if (user!.role === 'eleve') {
      if (cand.UserId !== userId) return res.status(403).json('Les élèves ne peuvent accéder qu\'à leurs propres candidatures');
      if (!['brouillon', 'dossier incomplet'].includes(cand.status)) return res.status(403).json('Vous ne pouvez pas mettre à jour votre candidature si celle-ci est déjà transmise');
    }
    //end of guards

    const attach = await Attachment.findByPk(parseInt(attachId));
    if (attach === null) return res.status(404).json(`La pièce jointe ${attachId} n'a pas été trouvée`);
    else return attach.destroy()
      .then(() => res.sendStatus(204))
      .catch(err => {
        logger.error(['error while deleting an attachment', err]);
        res.status(500).json('Erreur serveur lors de la suppression de la pièce jointe');
      });
  }
});

export = candidatureRouter;