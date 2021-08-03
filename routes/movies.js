const router = require('express').Router();

const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getUserMovies);
router.post('/', createMovie);
router.delete('/movieId', deleteMovie);

module.exports = router;
