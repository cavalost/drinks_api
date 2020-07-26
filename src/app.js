const express = require('express');
const cors = require('cors');

const eventRouter = require('./routes/eventRouter');
const { handleErrors, handle404Error } = require('./utils/errorHandler');

const app = express();

app.use(cors());

app.use('/api/events', eventRouter);

app.use(handle404Error);

app.use(handleErrors);

module.exports = app;
