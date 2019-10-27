import { Request, Response, Router } from 'express';
const evenementRouter = Router();

evenementRouter.get('/', (req: Request, res: Response) => {
  res
    .status(200)
    .send('get all evenement');
});

export = evenementRouter;