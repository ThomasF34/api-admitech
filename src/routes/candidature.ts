import { Request, Response, Router } from 'express';
import candidatureController from '../controllers/candidatures';
import Candidature from '../models/candidature';
import checkJwt from '../middlewares/auth.middleware';
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

//TODO use checkJWT
candidatureRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const candidature: Candidature = await candidatureController.getById(id);
    if (candidature === null) res.status(404).json(`Candidature ${id} not found`);
    else res.status(200).json(candidature);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

export = candidatureRouter;