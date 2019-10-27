import { Request, Response, Router } from "express";
const offreRouter = Router();

offreRouter.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.send('get all offre');
});

export = offreRouter