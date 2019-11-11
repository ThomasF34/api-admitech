import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import userController from '../controllers/user.controller';
import User from '../models/user';
import { checkIfUnencryptedPasswordIsValid } from '../helpers/password.helper';
const authRouter = Router();

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
        const token = jwt.sign({ role: user.role, email: user.email, first_name: user.first_name, last_name: user.last_name }, process.env.Secret_Key_JWT!, {
          expiresIn: '1h'
        });

        //Send the jwt in the response
        res.status(200);
        res.send(token);
      }
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(401);
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
      res.sendStatus(201);
    } else {
      res.status(400).json('email déjà utilisé');
    }
  } catch (e) {
    res.status(500).json(e.message);
  }
});


//TODO VerifyToken

export = authRouter;