import { Request, Response, Router } from 'express';
import checkJwt = require('../middlewares/auth.middleware');
import Entretien = require('../models/entretien');
import entretienController from '../controllers/entretiens';
const entretienRouter = Router();

entretienRouter.get('/:candidatureId',[checkJwt], async (req: Request, res: Response) => {
    try {
    const candId = parseInt(req.params.candidatureId);
    const entretien: Entretien = await entretienController.entretienByCandidature(candId);
    entretien === null ?
      res.sendStatus(204) :
      res.status(200).json(entretien);
    } catch (e) {
        res.status(500).json(e.message);
      }
});

export = entretienRouter;