import { Request, Response, Router } from 'express';
import candidatureController from '../controllers/candidatures';
import Candidature from '../models/candidature';
const candidatureRouter = Router();

candidatureRouter.get('/', async (req: Request, res: Response) => {
  try {
    const candidatures: Candidature[] = await candidatureController.getAll();
    res.status(200).json(candidatures);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

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