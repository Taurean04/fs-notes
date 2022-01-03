const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

logger.info('connecting to MongoDB');

mongoose.connect(config.MONGODB_URL)
	.then(() => {
		console.log('connected to MongoDB');
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message);
	});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger());
app.use('/api/notes', notesRouter);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;