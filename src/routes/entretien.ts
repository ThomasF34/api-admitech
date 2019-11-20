import { Request, Response, Router } from 'express';
import checkJwt = require('../middlewares/auth.middleware');
import Entretien = require('../models/entretien');
import entretienController from '../controllers/entretiens';
import juryController from '../controllers/jurys';
import logger = require('../helpers/logger');
import User = require('../models/user');
import Jury = require('../models/jury');
import { makeSlots } from '../helpers/slots.helper';
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
  interface Slot {
    beginning: Date,
    end: Date
  }

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
      const slots: Slot[] = makeSlots(new Date(req.body.begining_hour), new Date(req.body.ending_hour), req.body.duration);

      slots.forEach(async slot => {
        const { beginning, end } = JSON.parse(JSON.stringify(slot));
        const entretienToInsert = new Entretien();
        entretienToInsert.begining_hour = <Date>beginning,
        entretienToInsert.ending_hour = <Date>end,
        entretienToInsert.formation = <string>req.body.formation,
        entretienToInsert.created_at = new Date(),
        entretienToInsert.updated_at = new Date(),
        await entretienController.addEntretien(entretienToInsert);
      });
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/*
entretienRouter.get('/affecter', async (req: Request, res: Response) => {
  try {
    makeSlots(new Date(2019, 10, 10, 0, 0, 0, 0), new Date(2019, 10, 12, 0, 0, 0, 0), 1);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
*/

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

entretienRouter.put('/jury/affecter', [checkJwt], async (req: Request, res: Response) => {
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
      const jurysId: number[] = req.body.jurys_id;
      console.log(jurysId);
      let inserted: number[] = [];
      let resInsert;
      jurysId.forEach(async (element) => {
        console.log(element);
        resInsert = await juryController.assignJuryToEntretien(req.body.entretien_id, element);
        if (resInsert instanceof Jury) {
          inserted.push(0);
        }
      });

      if (inserted.length === jurysId.length) {
        res.sendStatus(200);
      } else {
        res
          .status(400)
          .json({ errors: resInsert });
      }
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export = entretienRouter;