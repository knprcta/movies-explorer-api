const router = require('express').Router();
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const { validateSignIn, validateSignUp } = require('../middlewares/validator');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { msgNotFoundRes } = require('../utils/constants');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSignUp, createUser);
router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.all('*', (req, res, next) => {
  next(new NotFoundError(msgNotFoundRes));
});

module.exports = router;
