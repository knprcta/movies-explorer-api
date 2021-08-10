require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const celebrateErrorHandler = require('./middlewares/celebrateErrorHandler');
const { dbURL } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorLogger);
app.use(celebrateErrorHandler);
app.use(errorHandler);

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : dbURL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => console.log('Connected to DataBase!'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
