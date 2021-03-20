import express from 'express';
import dotenv from 'dotenv';
// const apiRoute = require("./routes/api.js")
const app = express();

dotenv.config();

// app.use('/api', apiRoute)

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at ${process.env.PORT}`);
});
