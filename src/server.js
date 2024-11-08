const express = require('express')
const cors = require('cors')
const axios = require('axios')

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

if(process.env.ENV && process.env.ENV != 'prd'){
  initializeApp();
}else {
  const serviceAccount = require('./resources/firebase-key.json');
  initializeApp({
    credential: cert(serviceAccount)
  });
}

const db = getFirestore();

const docRefCollectionBoxs = db.collection('collectionBoxs')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/update-location-status/:imei/:level/:battery', async (req, res) => {
  console.log("EXECUTANDO update")
  const { imei, level, battery } = req.params;
  // const status =  Number(level) <= 10 ? 'full' : 'empty'

  const querySnapshot = await docRefCollectionBoxs.where('IMEI', '==', imei).get();
  
  if (querySnapshot.empty) {
    return res.status(404).send('Item não encontrado');
  }

  const doc = querySnapshot.docs[0];
  const docId = doc.id;
  const boxHeight = doc.height;

  const boxLevel = level / boxHeight * 100;

  await docRefCollectionBoxs.doc(docId).update({ imei, level:boxLevel, battery });

  res.send('Collection box updated successfully');
});

app.get('/get-collection-box/:imei', async (req, res) => {
  const { imei } = req.params;
  const querySnapshot = await docRefCollectionBoxs.where('IMEI', '==', imei).get();
  
  if (querySnapshot.empty) {
    return res.status(404).send('Item não encontrado');
  }

  const doc = querySnapshot.docs[0];
  res.send(doc.data());
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
