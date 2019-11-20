import { Request, Response, Router } from 'express';
import checkJwt = require('../middlewares/auth.middleware');
import User = require('../models/user');
import logger = require('../helpers/logger');
import documentController from '../controllers/documents';
const documentRouter = Router();

documentRouter.post('/upload', [checkJwt], async (req: Request, res: Response) => {
  const fileType = req.body.fileType;
  const fileName = req.body.fileName;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to create an application`);
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //guards
    if (!['eleve', 'administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration et un élève peuvent ajouter des pièces jointes');
    if (fileName === null || fileName === undefined) return res.status(400).send('Vous devez donner un nom de fichier');
    if (fileType === null || fileType === undefined) return res.status(400).send('Vous devez donner un type de fichier');

    logger.info(`User ${userId} is asking to add a new file ${fileName}.${fileType}`);

    try {
      const data = await documentController.generateUploadSignedUrl(fileType, userId);
      logger.info(['Signed url has been generated to upload file', data.signedUrl, data.key, fileName, fileType]);
      return res
        .status(200)
        .send(data);
    } catch (err) {
      logger.error(['Error while getting AWS S3 PUT Signed URL', err]);
      return res.status(500).json('Une erreur s\'est produite');
    }
  }
});

function decrypt(key: string) {
  const array = key.split(':::');
  if (array.length !== 2) throw new Error;
  else return parseInt(array[0]);
}

documentRouter.get('/access', [checkJwt], async (req: Request, res: Response) => {
  const key = req.query.key;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to create an application`);
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //guards
    if (!['eleve', 'administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration et un élève peuvent accéder aux pièces jointes');
    if (key === null || key === undefined) return res.status(400).send('Vous devez donner une clé de fichier');
    if (user!.role === 'eleve') {
      try {
        const decryptedKey = decrypt(key);
        if (decryptedKey !== userId) {
          logger.warn(`User ${userId} tried to access ressource ${key} while it is not part of its attachment`);
          return res.status(403).send('Les élèves ne peuvent accéder qu\'a leurs propres pièces jointes');
        }
      } catch (e) {
        logger.error(['Error when decrypting key', key]);
        res.status(500).json('Une erreur s\'est produite');
      }
    }

    logger.info(`User ${userId} is asking to access the file ${key}`);

    try {
      const data = await documentController.generateGetSignedUrl(key);
      logger.info([`Signed_URL has been generated to access ${key}`, data]);
      return res
        .status(200)
        .send(data);
    } catch (err) {
      logger.error(['Error while getting AWS S3 GET Signed URL', err]);
      return res.status(500).json('Une erreur s\'est produite');
    }
  }
});

documentRouter.delete('/', [checkJwt], async (req: Request, res: Response) => {
  const key = req.query.key;
  const userId = res.locals.user.id;
  const user = await User.findByPk(userId);
  if (user === undefined) {
    logger.error(`User ${userId} not found while trying to create an application`);
    res
      .status(404)
      .send('Utilisateur non trouvé');
  } else {
    //guards
    if (!['eleve', 'administration'].includes(user!.role)) return res.status(403).send('Seule l\'administration et un élève peuvent supprimer des pièces jointes');
    if (key === null || key === undefined) return res.status(400).send('Vous devez donner une clé de fichier');
    if (user!.role === 'eleve') {
      try {
        const decryptedKey = decrypt(key);
        if (decryptedKey !== userId) {
          logger.warn(`User ${userId} tried to delete ressource ${key} while it is not part of its attachment`);
          return res.status(403).send('Les élèves ne peuvent supprimer que leurs propres pièces jointes');
        }
      } catch (e) {
        logger.error(['Error when decrypting key', key]);
        res.status(500).json('Une erreur s\'est produite');
      }
    }

    logger.info(`User ${userId} is asking to delete the file ${key}`);

    try {
      const data = await documentController.deleteAttachment(key);
      logger.info([`Doc ${key} has been deleted`, data]);
      return res
        .status(200)
        .send(data);
    } catch (err) {
      logger.error(['Error while deleting AWS S3 file', err]);
      return res.status(500).json('Une erreur s\'est produite');
    }
  }
});

export = documentRouter;