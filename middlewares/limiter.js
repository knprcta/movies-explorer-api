const rateLimit = require('express-rate-limit');
const { msgTryLater } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 5000,
  max: 100,
  message: msgTryLater,
});

module.exports = limiter;
