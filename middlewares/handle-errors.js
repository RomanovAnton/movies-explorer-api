const validationError = require('../utils/errors/validation-error');
const { COMMON_ERROR_CODE } = require('../utils/errors/error-constants');
const conflictError = require('../utils/errors/conflict-error');

module.exports = (err, req, res, next) => {
  console.log(err.message);

  if (err.name === 'ValidationError' || err.name === 'CastError') {
    res
      .status(validationError.statusCode)
      .send({ message: validationError.message });
    return;
  }

  if (err.name === 'UnauthorizedError') {
    res.status(err.statusCode).send({
      message: err.message,
    });
    return;
  }

  if (err.code === 11000) {
    res.status(conflictError.statusCode).send({
      message: conflictError.message,
    });
    return;
  }

  if (err.name === 'NotFoundError') {
    res.status(err.statusCode).send({ messaege: err.message });
    return;
  }

  if (err.name === 'ForbiddenError') {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  if (err.message === 'Указанного пути не существует') {
    res.status(400).send({
      message: 'Указанного пути не существует',
    });
    return;
  }

  const { statusCode = COMMON_ERROR_CODE, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === COMMON_ERROR_CODE
        ? 'На сервере произошла ошибка'
        : message,
  });

  next();
};
