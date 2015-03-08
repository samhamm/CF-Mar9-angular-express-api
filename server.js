'use strict';

var express = require('express');
var app = express();
var capLogsRoutes = require('./routes/capLogs-routes');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/capLogs-app-development');

capLogsRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});
