import { Request, Response, Router } from 'express';
import checkJwt = require('../middlewares/auth.middleware');
import Entretien = require('../models/entretien');
import entretienController from '../controllers/entretiens';
import logger = require('../helpers/logger');
const entretienRouter = Router();

entretienRouter.get('/available', [checkJwt], async (req: Request, res: Response) => {
  try {
    logger.info('ntm');
    const entretiens: Entretien[] = await entretienController.getAllEntretiensAvailable();
    logger.info('ntm1');

    entretiens.length === 0 ?
      res.sendStatus(204) :
      res.status(200).json(entretiens);
  } catch (e) {
    logger.error(e);
    res.status(500).json(e.message);
  }
});

entretienRouter.get('/:candidatureId', [checkJwt], async (req: Request, res: Response) => {
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


entretienRouter.put('/', [checkJwt], async (req: Request, res: Response) => {

  const entretien: Entretien = await entretienController.getEntretienById(req.body.id);
  const candId = parseInt(req.body.candidature_id);

  try {
    const updateResponse = await entretienController.assignCandidatureToEntretien(entretien.id, candId);
    if (updateResponse instanceof Entretien) {
      res.sendStatus(200);
    } else {
      res
        .status(400)
        .json({ errors: updateResponse });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export = entretienRouter;