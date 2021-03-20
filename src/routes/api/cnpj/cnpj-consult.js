const express = require('express')
const axios = require('axios');
const cors = require('cors');
const router = express.Router();

const bodyParser = require('body-parser');

router.use(cors())
router.use(bodyParser.json())


router.get('/:cnpj', (req, res) => {
  axios.get(`https://www.receitaws.com.br/v1/cnpj/${req.params.cnpj}`)
  .then(response => {
    res.send(response.data)
    })
  .catch(error => res.send(error))
})

module.exports=router;
