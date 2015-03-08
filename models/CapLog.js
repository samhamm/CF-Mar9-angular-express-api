'use strict';

var mongoose = require('mongoose');

// "Schema design is a big topic and just something you kind of have to suffer through." - Tyler, 2/18

var capLogSchema = new mongoose.Schema({
  capLogBody: String,
  author: String,
});

module.exports = mongoose.model('CapLog', capLogSchema);
