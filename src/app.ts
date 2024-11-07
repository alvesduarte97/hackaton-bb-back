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

const docRef = db.collection('users').doc('alovelace');

await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});