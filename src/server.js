const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

if(process.env.GOOGLE_APPLICATION_CREDENTIALS && process.env.GOOGLE_APPLICATION_CREDENTIALS != ''){
  initializeApp();
}else {
  const serviceAccount = require('./resources/firebase-key.json');
  initializeApp({
    credential: cert(serviceAccount)
  });
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
