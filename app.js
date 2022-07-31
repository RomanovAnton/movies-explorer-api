const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

app.use('/', require('./routes/auth'));
app.use('/users', auth, require('./routes/users'));
app.use('/movies', auth, require('./routes/movies'));

app.listen(PORT);
