import { Request, Response, Router } from "express";
const entrepriseRouter = Router();

entrepriseRouter.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.send('get all entreprise');
});

export = entrepriseRouter