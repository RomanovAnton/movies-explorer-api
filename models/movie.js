const mongoose = require('mongoose');
const { regExpUrl } = require('../utils/regexp/regExpUrl');
const User = require('./user');

const movieSchema = new mongoose.Schema({
  country: {
    required: true,
    type: String,
  },
  director: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (v) => regExpUrl.test(v),
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (v) => regExpUrl.test(v),
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (v) => regExpUrl.test(v),
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  movieId: {
    required: true,
    type: Number,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movieSchema);
