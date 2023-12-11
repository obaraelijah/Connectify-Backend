const fs = require('fs');
const path = require('path');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors('*'));



app.use(
  morgan('common', {
    stream: fs.createWriteStream(path.join(__dirname, '/logs/access.log'), {
      flags: 'a',
    }),
  }),
);
app.use(
  express.urlencoded({
    extended: false,
  }),
);

app.use('/', (req, res) => {
  res
    .status(200)
    .json({ statusCode: 200, success: true, message: 'Health OK' });
});


module.exports = app;