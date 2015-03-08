'use strict';

// Bring in the schema for the data
var CapLog = require('../models/CapLog');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

var angular = require('angular');

// Definte the RESTful HTTP behaviors
module.exports = function(app) {
  app.use(bodyParser.json());

  //POST
  app.post('/capLogs', function(req, res) {
    var newCapLog = new CapLog(req.body);
    newCapLog.save(function(err, capLog) {
      if (err) return res.status(500).send({'msg': 'error - could not save to capLogs'});
      res.json(capLog);
    });
  });

  //GET
  app.get('/capLogs', function(req, res) {
    CapLog.find({}, function(err, data){
      if (err) return res.status(500).send({'msg': 'error - could not retrieve capLogs'});
      res.json(data);
    });
  });

  //PUT
  app.put('/capLogs/:id', function (req, res) {
    var updatedCapLog = req.body;
    delete updatedCapLog._id;
    CapLog.update({_id: req.params.id}, updatedCapLog, function(err) {
      if (err) return res.status(500).send({'msg': 'error updating capLogs'});
      res.json(req.body);
    });
  });

  //DELETE
  app.delete('/capLogs/:id', function (req, res) {
    CapLog.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'error deleting from capLogs'});
      res.json({msg: 'deleted from capLogs'});
    });
  });

};
