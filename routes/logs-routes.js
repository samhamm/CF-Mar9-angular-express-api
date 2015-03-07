'use strict';

// Bring in the schema for the data
var Log = require('../models/Log');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

var angular = require('angular');

// Definte the RESTful HTTP behaviors
module.exports = function(app) {
  app.use(bodyParser.json());

  //POST
  app.post('/logs', function(req, res) {
    var newLog = new Log(req.body);
    newLog.save(function(err, log) {
      if (err) return res.status(500).send({'msg': 'error - could not save to logs'});
      res.json(log);
    });
  });

  //GET
  app.get('/logs', function(req, res) {
    Log.find({}, function(err, data){
      if (err) return res.status(500).send({'msg': 'error - could not retrieve logs'});
      res.json(data);
    });
  });

  //PUT
  app.put('/logs/:id', function (req, res) {
    var updatedLog = req.body;
    delete updatedLog._id;
    Log.update({_id: req.params.id}, updatedLog, function(err) {
      if (err) return res.status(500).send({'msg': 'error updating logs'});
      res.json(req.body);
    });
  });

  //DELETE
  app.delete('/logs/:id', function (req, res) {
    Log.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'error deleting from logs'});
      res.json({msg: 'deleted from logs'});
    });
  });

}; //closes the module.exports
