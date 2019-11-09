import express from 'express';
import { createLogger, format, transports } from 'winston';
import connectDatadog from 'connect-datadog';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import candidatureRouter from './routes/candidature';
import evenementRouter from './routes/evenement';
import qcmRouter from './routes/qcm';
import entrepriseRouter from './routes/entreprise';
import offreRouter from './routes/offre';

dotenv.config();


const dd_options = {
  'response_code': true,
  'tags': [`app:api-admitech-${process.env.NODE_ENV}`]
};

const app = express();
const port = 3000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());


// Logger creation
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: `api-admitech-${process.env.NODE_ENV}` },
  transports: [
    new transports.File({ filename: 'logs/test.log' })
  ]
});
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple()
    )
  }));
}

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
