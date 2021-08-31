const { celebrate, Joi, CelebrateError } = require('celebrate');
const validator = require('validator');
const { msgNoValidUrl } = require('../utils/constants');

const isUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new CelebrateError(msgNoValidUrl);
  }
  return value;
};

const validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isUrl),
    trailer: Joi.string().required().custom(isUrl),
    thumbnail: Joi.string().required().custom(isUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports = {
  validateSignUp,
  validateSignIn,
  validateUserInfo,
  validateMovie,
  validateMovieId,
};
