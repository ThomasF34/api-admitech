
const exempleRouter = require('express').Router();

//Get a text from the API and send it
exempleRouter.get('/', (req: any, res: any) => {
  res.type('application/json');
  res.status(200);
  res.send('Une ressource');
});