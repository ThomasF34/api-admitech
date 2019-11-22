import express from 'express';
const router = express();

import candidatureRouter from './candidature';
import evenementRouter from './evenement';
import qcmRouter from './qcm';
import entrepriseRouter from './entreprise';
import offreRouter from './offre';
import authRouter from './auth';
import profileRouter from './profile';
import documentRouter from './document';
import entretienRouter from './entretien';

router.use('/candidature', candidatureRouter);
router.use('/evenement', evenementRouter);
router.use('/qcm', qcmRouter);
router.use('/entreprise', entrepriseRouter);
router.use('/offre', offreRouter);
router.use('/utilisateur', authRouter);
router.use('/profil', profileRouter);
router.use('/document', documentRouter);
router.use('/entretien', entretienRouter);

export default router;
