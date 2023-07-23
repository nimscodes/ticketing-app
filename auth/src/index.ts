import express from 'express'
import { json } from 'body-parser'

const app = express();
app.use(json());

app.get('/api/users/currentuser', (req, res) => {
  res.send("Hi Esther Bama");
})

app.listen(3000, () => {
  console.log('app is listening on port 3000!!!!!');
})