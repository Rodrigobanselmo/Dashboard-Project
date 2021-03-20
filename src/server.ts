/* eslint-disable no-console */
import express from 'express';
import dotenv from 'dotenv';

import apiRoute from './routes/api';

const app = express();

dotenv.config();

app.use('/api', apiRoute);

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
