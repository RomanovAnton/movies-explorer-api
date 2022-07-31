const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpUrl } = require('../utils/regexp/regExpUrl');
const { getFilms, createFilm, deleteFilm } = require('../controllers/movies');

router.get('/', getFilms);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().integer().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().regex(regExpUrl),
      trailerLink: Joi.string().required().regex(regExpUrl),
      thumbnail: Joi.string().required().regex(regExpUrl),
      movieId: Joi.string().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
    }),
  }),
  createFilm,
);

router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().length(24).hex(),
    }),
  }),
  deleteFilm,
);

module.exports = router;
