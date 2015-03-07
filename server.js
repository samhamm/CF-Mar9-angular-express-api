'use strict';

var express = require('express');
var app = express();
var router = express.Router();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/logs-app-development');

var logsRoutes = require('./routes/logs-routes');
logsRoutes(router);

app.use('/api/v1', router);

app.listen(process.env.PORT || 3000, function() {
  console.log('The server is listening on port ' + (process.env.PORT || 3000));
});
