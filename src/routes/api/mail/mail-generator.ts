/* eslint-disable import/no-unresolved */
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as nodemailer from 'nodemailer';

const router = express.Router();

dotenv.config();

const transport = nodemailer.createTransport({
  host: 'smtp.umbler.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.use(cors());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/invite-members', (req, res) => {
  const data = req.body;

  transport
    .sendMail({
      from: `SimpleSST ${process.env.EMAIL_USER}`,
      to: data.to,
      replyTo: process.env.EMAIL_USER,
      subject: data.subject,
      html: data.html,
    })
    .then(() => {
      console.log('enviada');
      res.send('Mensagem enviada corretamente');
    })
    .catch(error => {
      console.log('Error occurred');
      console.log(error.message);
      res.send('Alguma erro aconteceu');
    });
});

export default router;
