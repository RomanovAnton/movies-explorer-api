const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getProfileData, updateProfileData } = require('../controllers/users');

router.get('/me', getProfileData);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required(),
    }),
  }),
  updateProfileData,
);

module.exports = router;
