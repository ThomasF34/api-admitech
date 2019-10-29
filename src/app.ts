import express from 'express';
import { createLogger, format, transports } from 'winston';
import connectDatadog from 'connect-datadog';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const dd_options = {
  'response_code': true,
  'tags': ['app:api-admitech']
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
  defaultMeta: { service: 'api-admitech' },
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
} else {
  new transports.File({ filename: 'logs/test.log' });
}

app.use(connectDatadog(dd_options));

app.get('/', (req, res) => {
  logger.info('A request had been received on /');
  res.send('Hello World !');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
