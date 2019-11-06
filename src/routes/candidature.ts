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

export = candidatureRouter;