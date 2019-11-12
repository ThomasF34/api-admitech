//Router for everything that relates to the currently connected user

import { Request, Response, Router } from 'express';
import userController = require('../controllers/user.controller');
import checkJwt = require('../middlewares/auth.middleware');
const profileRouter = Router();

profileRouter.get('/', [checkJwt], async (req: Request, res: Response) => {
  const id = res.locals.user.id;
  const role = res.locals.user.role;
  res.status(200).json(await userController.getOwnProfile(id, role));
});

export = profileRouter;