'use strict';

var mongoose = require('mongoose');

// "Schema design is a big topic and just something you kind of have to suffer through." - Tyler, 2/18

var logSchema = new mongoose.Schema({
  name: String,
  date: String,
  content: String
});

module.exports = mongoose.model('Log', logSchema);
