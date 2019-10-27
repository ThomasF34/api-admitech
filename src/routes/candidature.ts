import { Request, Response, Router } from "express";
const candidatureRouter = Router();

candidatureRouter.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send('get all candidature');
});

export = candidatureRouter