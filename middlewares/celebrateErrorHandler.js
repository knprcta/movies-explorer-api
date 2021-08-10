const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');
const { msgCelebrateErr } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    throw new BadRequestError(msgCelebrateErr);
  }
  next(err);
};
