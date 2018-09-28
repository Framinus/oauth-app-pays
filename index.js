const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { CLIENT_ID } = require('./config');

const app = express();
const callback = multer();

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
}

app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/auth', (req, res) => {
  res.render('auth');
})

app.post('/callback', callback.array(), (req, res) => {
  const result = req.body.json;
  console.log('result', result);
  res.send('Hello API Event Received');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
