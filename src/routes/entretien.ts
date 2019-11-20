import { Request, Response, Router } from 'express';
import checkJwt = require('../middlewares/auth.middleware');
import Entretien = require('../models/entretien');
import entretienController from '../controllers/entretiens';
import logger = require('../helpers/logger');
import User = require('../models/user');
const entretienRouter = Router();

entretienRouter.get('/formation/:nomFormation/disponible', [checkJwt], async (req: Request, res: Response) => {
  try {

    const entretiens: Entretien[] = await entretienController.getAllEntretiensAvailableForFormation(req.params.nomFormation);
  
    entretiens.length === 0 ?
      res.sendStatus(204) :
      res.status(200).json(entretiens);
  } catch (e) {
    logger.error(e);
    res.status(500).json(e.message);
  }
});

entretienRouter.get('/etudiant/:candidatureId', [checkJwt], async (req: Request, res: Response) => {
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

entretienRouter.post('/', [checkJwt], async (req: Request, res: Response) => {

  try {
    const userId = res.locals.user.id;
    const user = await User.findByPk(userId);

    if (user === undefined) {
      logger.error(`User ${userId} not found while trying to create an application`);
      res
        .status(404)
        .send('Utilisateur non trouvé');
    } else {
      //role guards
      if (!['administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration peut créer des crénaux d\'entretiens');

      const entretienToInsert = new Entretien(
        {
          begining_hour: req.body.begining_hour,
          ending_hour: req.body.ending_hour,
          formation: req.body.formation,
          created_at: req.body.created_at,
          updated_at: req.body.updated_at,
        }
      );

      const createResponse = await entretienController.addEntretien(entretienToInsert);
      if (createResponse instanceof Entretien) {
        res.sendStatus(200);
      } else {
        res
          .status(400)
          .json({ errors: createResponse });
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


entretienRouter.put('/etudiant/affecter', [checkJwt], async (req: Request, res: Response) => {

  const entretien: Entretien = await entretienController.getEntretienById(req.body.entretien_id);
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