require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./app/configs/config');
const routes = require('./app/routes/api');
const mongoose = require('mongoose');
const passport = require('passport');
const boom = require('express-boom');
require('./app/configs/passport');

const { port, host, name } = config.mongo;

// Connecting to the database
mongoose
  .connect(`mongodb://${host}/${name}:${port}`, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });

// Initialize http server
const app = express();

const router = express.Router();

// configure app.use()
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(boom());

// Handling errors
app.use((err, req, res, next) => {
  return res.status(err.output.statusCode).json({
    status: err.output.statusCode || 500,
    error: {
      message: err.message
    }
  });
});

// use express router
app.use('/api/v1', router);

routes(router);

// Launch the server on port 3000
const server = app.listen(config.app.port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
