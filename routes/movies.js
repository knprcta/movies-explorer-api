const router = require('express').Router();

const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateMovie, validateMovieId } = require('../middlewares/validator');

router.get('/', getUserMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
