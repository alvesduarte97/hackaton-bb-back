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
// initializeApp();
// }else {
//   const serviceAccount = require('./resources/firebase-key.json');

const serviceAccount = {
  "type": "service_account",
  "project_id": "hackatonbb",
  "private_key_id": "b64942c9506577e7f5800fcde4e37dadf86b588f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDJsso3ZRhJxdx4\nRsYOrcksKnDRzW+meENlzpj8Qem7wg/5FgfKhTJ0d76n603Zg8hOAC4NSgaNps0d\nyyNN9WmU5W9mFvfxzCqbWyvPX9xXG32QU1hngE/69mzYAIDP0gYSSqtqql6OZjDW\n9QP4f5fQK4fixwlUqpdh063YomhCx5/v34BCfG37u4viEM4fXQ8g4PBldBbGYlXR\n/w4vdOqZTmfiRb6QwggtHCq+g91Fwepi4ZyjLmHtPULeB2iiNzlLNq1FHnMy7pqz\n/xh9/25OLMjEMSxpto6U6XoA6s7cxk77yD8FE95aa1eR6YL90JV4lY1U8JXeNmqo\nni447qt7AgMBAAECggEAMPSvdmCYU5et2pe7DOcLlCe8+H93oR1Bpp1NrrTE6ajB\nvcCmJXbM9031Pca0P55n6N7MTrdv/cPFt3yN1idB+Dz0HABpMAxRLyIi8ROgZJgs\nkvJX289eGljjtE3y9f5RMPFkx+AQUVnmctZHn3JAw+s88UNENYOueLUrVhCdY8+n\n6CVHEdfFBTTdvf09GiA8AE2jQoJZUf7ShD5aBtQBdR2FxEnkkOwe5NSbL/3KOpF5\nBTzivyzl3lkbB4eJNGiwQGqzQg+IMCoJ6NVLYh0EzHMz1cvwwdLsVCxsg/2DNQ38\nasc76a8ZLL9e4EZcIq7yu4BBMv5ykcjCzkcpwL9lsQKBgQDj9tpJbm0/B1Hbq3+w\nZuxgex2xb5RKjH3+j9xJ7zI9hsl07d3IqDr1gS4GSTwwHROnWNGiUl9L/sjMmDEi\nP72umdsagjbmDy76Cm4rmQt8DdimER+g20MvCIF2mhZNZZL+guoMeTIYNQhReiUr\nWKQQJ9LC9X0Tf2rd+Y7d57LuyQKBgQDigP3jXYRQfnsuzqrQ5m4a7qwYKBOGcGHk\n+h6LtiUn6ZPiwGWxmBz8vKS1EKncDLsksQjRAKcXroQEtN+UzzRYUX0/B83pCeYO\nyuR+428D2Z6gwp5WsWUYhq5Uu1Y7i9Arp2Zm7qXYC2culwPK6A6tOGEfpgbu4qTq\nYTtgmvzWIwKBgCq+Hi+mhNVMigymG0r4AVoVu3uJcESKExWn46X5M3JV03AZKXx2\nDpf5oKeNE7vxt72o6aWFzFhzbTLvVkcVrHsQXgSaZbC9KBG54u5Jw91+uyBoFYYT\nloU7Ewsp2QSqBuWxpjCwiLQBPY4JWO7Hr/tXfC0R2mHNgjwcjq0MxIABAoGBAI40\nojHvcrT+0+PtSP1iztoF4vI/pxKO2EdkaW0Z7HYEhh6k4LQBZqGe5mHvllVbgNtm\ncryVhlKt9KDn1j+dX6Xbc6DxC2w2FMRQyeiIbhiitp8D0VlogqpFVIpKG7fC7e2a\nagZR6rmbXyq3EWCBFUXX0dKG8G9myFeGuDrM09S1AoGBAJrrzezupE7hX+5l0Z8y\nxFQCKqZMq19P4ibzvJXz7pSef9See6cyAEnByNKjdQ6CwiorKIeRzm2M26uq3EJY\nYzYz+PjA5/Q/cGnqgqe/tIDTHcGCVUGIYLseXkq0Sue0dHBDZiqX5y8olcbaub+t\nw60s4r03sGWG9pq42RWzeKOs\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-ucz8n@hackatonbb.iam.gserviceaccount.com",
  "client_id": "110038917337061726746",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ucz8n%40hackatonbb.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
  initializeApp({
    credential: cert(serviceAccount)
  });
// }

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
