import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userController from '../controllers/user.controller';
import User from '../models/user';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';
import logger from '../helpers/logger';
const request = require("sync-request")
const buildUrl = require('build-url');
const queryString = require('query-string');
const authRouter = Router();

const authServer = {
	authorizationEndpoint: 'http://oauth-dev.igpolytech.fr/oauth/authorize',
	tokenEndpoint: 'http://oauth-dev.igpolytech.fr/oauth/token'
}

const client = {
	"client_id": "o1-g1", 
  "redirect_uri": "http://www.google.com",
  "state":2
}

const params=queryString.stringify(client, {sort: false});

authRouter.get('/authorize', async (req: Request, res: Response) => {
  const authorizationUrl=  authServer.authorizationEndpoint+"?"+params
  console.log(authorizationUrl)

  res.redirect(authorizationUrl)

});



authRouter.get('/callback', async (req: Request, res: Response)=> {


    let code = req.query.code
  
    let params = queryString.stringify({
      code: code,
      client_id: client.client_id
    })

    let headers = {
      'Content-Type':'application/x-www-form-urlencoded',
    }

    let tokRes = request('POST', authServer.tokenEndpoint, {
      headers: headers,
      body: params
    })

    let body = JSON.parse(tokRes.getBody()) // TODO
    let access_token = body.access_token
    let refresh_token= body.refresh_token
	res.render('index', {access_token: access_token, refresh_token: refresh_token})
  })



//Get a text from the API and send it
authRouter.post('/connexion', async (req: Request, res: Response) => {
  
  res.type('application/json');

  const { email, password } = req.body;
  try {
    if (!(email && password)) {
      res.sendStatus(400);
    }
    let user: User | null;

    user = await userController.getUserByEmail(email);

    if (user != null) {
      //Check if encrypted password match
      if (!checkIfUnencryptedPasswordIsValid(password, user.password)) {
        res.sendStatus(401);
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
  try {

    const userToAdd = new User();
    userToAdd.email = req.body.email;
    userToAdd.last_name = req.body.last_name;
    userToAdd.first_name = req.body.fir;
    userToAdd.password = req.body.password;
    userToAdd.role = req.body.role;

    const user = await userController.addUser(userToAdd);
    if (user != undefined) {
      logger.info(`User ${user.email} registered`);
      res.sendStatus(201);
    } else {
      res.status(400).json('Email déjà utilisé');
    }
  } catch (e) {
    logger.error(['Error while registering user', e]);
    res
      .status(500)
      .json('Une erreur s\'est produite');
  }
});


//TODO VerifyToken

export = authRouter;