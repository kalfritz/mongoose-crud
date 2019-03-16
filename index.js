const express = require('express');
const cors = require('cors');
const routes = require('./routes/api');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/ninjadb', {
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalUrl);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

const port = 3000 || process.env.port;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
