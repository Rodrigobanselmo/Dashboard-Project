import express from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/:cnpj', (req, res) => {
  axios
    .get(`http://consultaca.com/15151`)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => res.send(error));
});

export default router;
