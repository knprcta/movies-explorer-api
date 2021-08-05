const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const {
  msgNotFoundUser,
  msgConflictUser,
  msgSuccessSignUp,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError(msgNotFoundUser))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError(msgNotFoundUser))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError(msgConflictUser);
      }
      next(err);
    })
    .then(() => res.send({ message: msgSuccessSignUp }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '14d' },
      );

      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getUserInfo, updateUserInfo, createUser, login,
};
