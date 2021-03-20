import express from 'express';
import apiMailer from './api/mail';
import apiCNPJ from './api/cnpj';
import apiCAEPI from './api/caepi';

const router = express.Router();
// const apiExcel = require("./api/excel/excel-generator")

// routesrouter.use('/excel', apiExcel)
router.use('/mail', apiMailer);
router.use('/cnpj', apiCNPJ);
router.use('/caepi', apiCAEPI);

export default router;
