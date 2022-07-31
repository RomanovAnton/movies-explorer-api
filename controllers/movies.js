const Movie = require('../models/movie');

module.exports.getFilms = (req, res) => {
  Movie.find({})
    .then((films) => {
      res.status(200).send({ films });
    })
    .catch((err) => {
      res.status(404).send({ err: err.message });
    });
};

module.exports.createFilm = (req, res) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((film) => {
      res.status(200).send({ film });
    })
    .catch((err) => {
      res.status(404).send({ err: err.message });
    });
};

module.exports.deleteFilm = (req, res) => {
  Movie.findByIdAndRemove(req.params.movieId)
    .then(() => {
      res.send({ message: 'успешно удален' });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
