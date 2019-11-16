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
      const data = await documentController.generateSignedUrl(fileName, fileType);
      logger.info(['SignedUrl has been generated', data.signedUrl, data.url, fileName, fileType]);
      return res
        .status(200)
        .send(data);
    } catch (err) {
      logger.error(['Error while getting AWS S3 Signed URL', err]);
      return res.status(500).json('Une erreur s\'est produite');
    }
  }
});

export = documentRouter;