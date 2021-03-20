/* eslint-disable */
const express = require('express');
const path = require('path');
const cors = require('cors');
const excel = require('./fileGenerate');

const router = express.Router();

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/create', (req, res) => {
  excel.processData(res);
  console.log('object');
});

router.get('/fetch', (req, res) => {
  console.log('3');
  //res.sendFile(path.join(__dirname,files,ExcelFile.xlsx));
  res.sendFile(`${__dirname}/files/ExcelFile.xlsx`);
  console.log('2');
});

module.exports = router;
