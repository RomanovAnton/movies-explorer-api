require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { PORT, DB_ADDRESS } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(DB_ADDRESS);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(require('./middlewares/cors'));

app.use(require('./routes/index'));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/handle-errors'));

app.listen(PORT);
