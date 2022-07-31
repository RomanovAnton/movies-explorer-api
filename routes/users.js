const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpUrl } = require('../utils/regexp/regExpUrl');
const { getProfileData, updateProfileData } = require('../controllers/users');

router.get('/me', getProfileData);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().regex(regExpUrl),
      name: Joi.string().required(),
    }),
  }),
  updateProfileData,
);

module.exports = router;
