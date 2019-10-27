import { Request, Response, Router } from "express";
const evenementRouter = Router();

evenementRouter.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.send('get all evenement');
});

export = evenementRouter