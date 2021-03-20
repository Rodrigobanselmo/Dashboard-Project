import express from 'express';
import apiMailer from './api/mail';
import apiCNPJ from './api/cnpj';
import apiCAEPI from './api/caepi';

/* eslint-disable @typescript-eslint/no-var-requires */
const apiExcel = require('./api/excel');

const router = express.Router();

router.use('/excel', apiExcel);
router.use('/mail', apiMailer);
router.use('/cnpj', apiCNPJ);
router.use('/caepi', apiCAEPI);

export default router;
