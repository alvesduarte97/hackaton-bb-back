const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
const port = parseInt(process.env.PORT) || 3000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
