

import express from 'express';
const app = express();


import {  cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './resources/firebase-key.json' with { type: "json" };

// if(process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.GOOGLE_APPLICATION_CREDENTIALS != ''){
//   initializeApp();
// }else {
//   initializeApp({
//     credential: cert(serviceAccount as ServiceAccount)
//   });
// }

// const db = getFirestore();

// const docRefBoxLocation = db.collection('locations')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/upsert-location-status/:imei/:ultrassonic', async (req, res) => {
    console.log("EXECUTANDO UPSERT")
  const ultrassonic = req.params.ultrassonic as string;
  const imei = req.params.imei as string;
  // http://localhost:3000/upsert-location-status?status=full&location=123132
    const status =  Number(ultrassonic) <= 10 ? 'full' : 'empty'

  // await docRefBoxLocation.doc(imei).set({
  //   status: status,
  // });

  if (status == 'full'){
    console.log("ENVIANDO EMAIL")
    await sendEmail({
        from: 'dm.inovaccoes@gmail.com',
        to: 'alvesduarte97@gmail.com',
        subject: 'Ponto de Coleta FULL',
        text: 'Ponto de coleta cheio',
        html: '<p>O ponto de coleta esta <b>cheio</b></p>',
    });
  }
  res.send('Status updated successfully');
});

app.get('/get-location', async (req, res) => {
  const locationId = req.query.location as string;
  // const doc = await docRefBoxLocation.doc(locationId).get();
  // res.send(doc.data());
});

const port = 8080;
app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

// export const server = onRequest(app) 


import nodemailer from 'nodemailer';

// Interface para definir os parâmetros de envio de email
interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
}

// Função para enviar o email
async function sendEmail(emailOptions: EmailOptions) {
  console.log('pass', process.env.EMAIL_PASS)
  // Configuração do transportador de email
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Ou outro provedor de email SMTP
    auth: {
      user: 'dm.inovaccoes@gmail.com', // Email do remetente
      pass: 'yblk bgzh jvim tvyl', // Senha do remetente
    },
  });

  // Envia o email com as opções definidas
  try {
    const info = await transporter.sendMail({
      from: emailOptions.from,
      to: emailOptions.to,
      subject: emailOptions.subject,
      text: emailOptions.text,
      html: emailOptions.html,
    });

    console.log('Email enviado com sucesso:', info.response);
  } catch (error) {
    console.error('Erro ao enviar o email:', error);
  }
}