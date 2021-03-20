import express from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/:cnpj', (req, res) => {
  axios
    .get(`https://www.receitaws.com.br/v1/cnpj/${req.params.cnpj}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => res.send(error));
});

export default router;
