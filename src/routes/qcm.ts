import { Request, Response, Router } from "express";
const qcmRouter = Router();

qcmRouter.get('/', (req: Request, res: Response) => {
  res.status(200)
  res.send('get all qcm');
});

export = qcmRouter