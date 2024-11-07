import express from 'express';
const app = express();
const port = 3000;

import { applicationDefault, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
import serviceAccount from './resources/firebase-key.json' with { type: "json" };

initializeApp({
    credential: cert(serviceAccount as ServiceAccount)
});

const db = getFirestore();

const docRefBoxLocation = db.collection('locations')

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/upsert-location-status', async (req, res) => {
  const status = req.query.status as string;
  const locationId = req.query.location as string;
  // http://localhost:3000/upsert-location-status?status=full&location=123132
  await docRefBoxLocation.doc(locationId).set({
    status: status,
  });
  res.send('Status updated successfully');
});

app.get('/get-location', async (req, res) => {
  const locationId = req.query.location as string;
  const doc = await docRefBoxLocation.doc(locationId).get();
  res.send(doc.data());
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});