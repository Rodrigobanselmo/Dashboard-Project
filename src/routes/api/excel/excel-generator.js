const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();
const excel = require('./excel-function')


router.use(cors())
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())


router.post('/create', (req, res) => {
  excel.processData(res)
  console.log('object')
});

router.get('/fetch', (req, res) => {
    console.log('3')
  res.sendFile(`${__dirname}/files/ExcelFile.xlsx`)
  console.log('2')
})

module.exports=router;
