import { Request, Response, Application } from 'express';
import express = require('express');

var app: Application = express();

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World')
});

app.listen(process.env.PORT, () => {
    console.log('Application listening at port', process.env.PORT)
});

(async () => {
  const database = require('./database/db');
  const Expenditure = require('./schemas/expenditure');

  try {
      const resultado = await database.sync();
      console.log(resultado);

      const resultadoCreate = await Expenditure.create({
          companyName: 'teste',
          validAt: 'teste',
          value: 10})
      console.log(resultadoCreate);
  } catch (error) {
      console.log(error);
  }
})()