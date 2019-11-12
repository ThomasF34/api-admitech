import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import logger = require('../helpers/logger');

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const bearerToken = <string>req.headers.authorization;
  let jwtPayload;

  //Try to validate the token and get data
  try {
    if (bearerToken != undefined) {
      const token = bearerToken.split(' ')[1];
      jwtPayload = <any>jwt.verify(token, process.env.SECRET_KEY_JWT!);
      res.locals.user = jwtPayload;

      //The token is valid for 1 hour
      //We want to send a new token on every request
      delete jwtPayload.exp;
      delete jwtPayload.iat;

      const newToken = jwt.sign(jwtPayload, process.env.SECRET_KEY_JWT!, {
        expiresIn: '1h'
      });
      res.setHeader('token-admitech', newToken);
      next();
    } else {
      res.status(401).json('User must be connected to make this request');
      res.end();
    }
  } catch (error) {
    logger.error(['Error while checking JWT', error]);
    res.sendStatus(500);
    res.end();
  }
};

export = checkJwt;