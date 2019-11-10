import express from 'express';
import connectDatadog from 'connect-datadog';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from './helpers/logger';
import dotenv from 'dotenv';
dotenv.config();

import candidatureRouter from './routes/candidature';
import evenementRouter from './routes/evenement';
import qcmRouter from './routes/qcm';
import entrepriseRouter from './routes/entreprise';
import offreRouter from './routes/offre';


const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const dd_options = {
  'response_code': true,
  'path': true,
  'tags': [`app:api-admitech-${process.env.NODE_ENV}`]
};

app.use(connectDatadog(dd_options));

// Primary routes
app.use('/candidature', candidatureRouter);
app.use('/evenement', evenementRouter);
app.use('/qcm', qcmRouter);
app.use('/entreprise', entrepriseRouter);
app.use('/offre', offreRouter);

app.get('/', (req, res) => {
  logger.info('A request had been received on /');
  res.send('Wilkkommen');
});

app.listen(port, () => logger.info(`App is listening on port ${port}!`));
