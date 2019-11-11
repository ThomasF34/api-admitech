//Router for everything that relates to the currently connected user

import { Request, Response, Router } from 'express';
import userController = require('../controllers/user.controller');
const profileRouter = Router();

//TODO use JWT
profileRouter.get('/', async (req: Request, res: Response) => {
  res
    .status(200)
    .json(await userController.getOwnProfileWithApplications());
});

export = profileRouter;