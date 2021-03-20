import express from 'express';
import axios from 'axios';
import cors from 'cors';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get('/:caepi', (req, res) => {
  axios
    .get(`http://consultaca.com/${req.params.caepi}`)
    .then(response => {
      res.send(response.data);
    })
    .catch(error => res.send(error));
});

export default router;
