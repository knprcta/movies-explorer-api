const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  msgNotFoundMovie,
  msgNotFoundMovies,
  msgForbiddenDel,
  msgSuccessDel,
} = require('../utils/constants');

const getUserMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      if (!movies) {
        throw new NotFoundError(msgNotFoundMovies);
      }
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: _id,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .orFail(new NotFoundError(msgNotFoundMovie))
    .then((movie) => {
      if (movie.owner.toString() !== _id) {
        throw new ForbiddenError(msgForbiddenDel);
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => res.send({ message: msgSuccessDel }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = { getUserMovies, createMovie, deleteMovie };
