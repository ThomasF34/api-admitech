import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userController from '../controllers/user.controller';
import User from '../models/user';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';
import logger from '../helpers/logger';
const authRouter = Router();

//Get a text from the API and send it
authRouter.post('/connexion', async (req: Request, res: Response) => {
  res.type('application/json');
  //guard
  const errs = ['email', 'password'].filter(field => !hasProperty(req.body, field));
  if (errs.length > 0) {
    return res.status(400).json(errs.map(missingField => { return { id: missingField, error: 'Ce champ est obligatoire' }; }));
  }

  try {
    const { email, password } = req.body;

    let user: User | null;

    user = await userController.getUserByEmail(email);

    if (user != null) {
      //Check if encrypted password match
      if (!checkIfUnencryptedPasswordIsValid(password, user.password)) {
        res.sendStatus(404);
      } else {
        //Sing JWT, valid for 1 hour
        const token = jwt.sign({ id: user.id, role: user.role, email: user.email, first_name: user.first_name, last_name: user.last_name }, process.env.SECRET_KEY_JWT!, {
          expiresIn: '1h'
        });

        //logging
        logger.info(`User ${user.id} got connected`);

        //Send the jwt in the response
        res
          .status(200)
          .send(token);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    logger.error(['Error while connecting a user', error]);
    res
      .status(500)
      .json('Une erreur s\'est produite');

  }
});

//Insert in the DB
authRouter.post('/inscrire', async (req: Request, res: Response) => {
  res.type('application/json');
  //guard
  const errs = ['first_name', 'last_name', 'email', 'password'].filter(field => !hasProperty(req.body, field));
  if (errs.length > 0) {
    return res.status(400).json(errs.map(missingField => { return { id: missingField, error: 'Ce champ est obligatoire' }; }));
  }

  try {
    const userToAdd = new User();
    userToAdd.email = req.body.email;
    userToAdd.last_name = req.body.last_name;
    userToAdd.first_name = req.body.first_name;
    userToAdd.password = req.body.password;
    userToAdd.role = req.body.role;

    const user = await userController.addUser(userToAdd);
    if (user != undefined) {
      logger.info(`User ${user.email} registered`);
      res.sendStatus(201);
    } else {
      res.status(400).json([{ id: 'email', error: 'Email déjà utilisée' }]);
    }
  } catch (e) {
    logger.error(['Error while registering user', e]);
    res
      .status(500)
      .json('Une erreur s\'est produite');
  }
});

const hasProperty = (obj: any, field: string) => Object.prototype.hasOwnProperty.call(obj, field);

authRouter.post('/connexionMyDash', async (req: Request, res: Response) => {
  //guard
  const bearerToken = <string>req.headers.authorization;
  if (bearerToken === undefined || bearerToken === null) {
    return res.status(400).json('Le Header Authorization est obligatoire pour se connecter avec MyDash');
  }

  const token = bearerToken.split(' ')[1];

  let jwtPayload: any;
  try {
    jwtPayload = jwt.verify(token, process.env.MYDASH_SECRET_CLIENT!);
  } catch (err) {
    logger.error(['Error while checking JWT', err]);
    return res.sendStatus(500);
  }

  const tokenErrs = ['email', 'firstname', 'lastname', 'role'].filter(field => !hasProperty(jwtPayload, field));
  if (tokenErrs.length > 0) {
    return res.status(400).json(tokenErrs.map(missingField => { return { id: missingField, error: 'Le token doit contenir ce champ' }; }));
  }

  if (!['teacher', 'admin'].includes(jwtPayload.role)) return res.status(400).json('La connexion MyDash est utilisable par les professeurs et membres de l\'administration uniquement');
  //end of guards

  try {
    const user: User | null = await userController.getUserByEmail(jwtPayload.email);

    if (user !== null) {
      const token = jwt.sign({ id: user.id, role: user.role, email: user.email, first_name: user.first_name, last_name: user.last_name }, process.env.SECRET_KEY_JWT!, {
        expiresIn: '1h'
      });

      //logging
      logger.info(`User ${user.id} got connected via MyDash`);

      //Send the jwt in the response
      res
        .status(200)
        .send(token);
    } else {
      const role = jwtPayload.role === 'teacher' ? 'professeur' : (jwtPayload.role === 'admin' ? 'administration' : '');

      const resCreation = await userController.addUser(<User>{
        email: jwtPayload.email,
        last_name: jwtPayload.lastname,
        first_name: jwtPayload.firstname,
        role: role
      });

      if (resCreation === undefined) {
        logger.error(['Error while trying to create user via MyDash connexion route', jwtPayload]);
        return res.status(500).json('Une erreur s\'est produite');
      }

      logger.info(`User ${resCreation!.id} created in DB following a MyDash initial connection`);

      const token = jwt.sign({ id: resCreation!.id, role: resCreation!.role, email: resCreation!.email, first_name: resCreation!.first_name, last_name: resCreation!.last_name }, process.env.SECRET_KEY_JWT!, {
        expiresIn: '1h'
      });

      res.status(200).send(token);
    }
  } catch (error) {
    logger.error(['Error while connecting a user', error, error.trace]);
    res
      .status(500)
      .json('Une erreur s\'est produite');

  }
});

export = authRouter;