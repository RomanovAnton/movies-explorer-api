require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');

const NotFoundError = require('./utils/errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(errorLogger);
app.use(requestLogger);
app.use(limiter);
app.use(require('./middlewares/cors'));

app.use(require('./routes/index'));

app.use(errors());
app.use((req, res, next) => {
  next(new NotFoundError('Указанного пути не существует'));
});
app.use(require('./middlewares/handle-errors'));

app.listen(PORT);
