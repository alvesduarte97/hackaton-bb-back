const express = require('express')
const cors = require('cors')
const axios = require('axios')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

// if(process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.GOOGLE_APPLICATION_CREDENTIALS != ''){
initializeApp();
// }else {
//   const serviceAccount = require('./resources/firebase-key.json');
//   initializeApp({
//     credential: cert(serviceAccount)
//   });
// }

const db = getFirestore();

const docRefBoxLocation = db.collection('locations')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/upsert-location-status/:imei/:ultrassonic', async (req, res) => {
  console.log("EXECUTANDO UPSERT")
const ultrassonic = req.params.ultrassonic;
const imei = req.params.imei;
// http://localhost:3000/upsert-location-status?status=full&location=123132
  const status =  Number(ultrassonic) <= 10 ? 'full' : 'empty'

await docRefBoxLocation.doc(imei).set({
  status: status,
});

res.send('Status updated successfully');
});

app.get('/get-location', async (req, res) => {
  const locationId = req.query.location;
  const doc = await docRefBoxLocation.doc(locationId).get();
  res.send(doc.data());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
