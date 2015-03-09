'use strict';

var mongoose = require('mongoose');

// "Schema design is a big topic and just something you kind of have to suffer through." - Tyler, 2/18

var caplogSchema = new mongoose.Schema({
  caplogBody: String,
  author: {type: String, default: 'Kirk'}
});

module.exports = mongoose.model('Caplog', caplogSchema);
