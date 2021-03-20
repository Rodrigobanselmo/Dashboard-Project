import express from 'express';
import apiMailer from './api/mail/mail-generator';

const router = express.Router();
// const apiExcel = require("./api/excel/excel-generator")
// const apiCNPJ = require("./api/cnpj/cnpj-consult")

// routesrouter.use('/excel', apiExcel)
router.use('/mail', apiMailer);
// router.use('/cnpj', apiCNPJ)

export default router;
