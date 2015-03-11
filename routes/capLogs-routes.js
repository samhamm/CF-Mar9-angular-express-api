//*****************
//caplogs-routes.js
//*****************

'use strict';

// Bring in the schema for the data
var Caplog = require('../models/Caplog');

// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');

// Definte the RESTful HTTP behaviors
module.exports = function(app) {
  app.use(bodyParser.json());

  //POST
  app.post('/caplogs', function(req, res) {
    var newCaplog = new Caplog(req.body);
    newCaplog.save(function(err, caplog) {
      if (err) return res.status(500).send({'msg': 'error - could not save to caplogs'});
      res.json(caplog);
    });
  });

  //GET
  app.get('/caplogs', function(req, res) {
    Caplog.find({}, function(err, data){
      if (err) return res.status(500).send({'msg': 'error - could not retrieve caplogs'});
      res.json(data);
    });
  });

  //PUT
  app.put('/caplogs/:id', function (req, res) {
    var updatedCaplog = req.body;
    delete updatedCaplog._id;
    Caplog.update({_id: req.params.id}, updatedCaplog, function(err) {
      if (err) return res.status(500).send({'msg': 'error updating caplogs'});
      res.json(req.body);
    });
  });

  //DELETE
  app.delete('/caplogs/:id', function (req, res) {
    Caplog.remove({_id: req.params.id}, function(err) {
      if (err) return res.status(500).send({'msg': 'error deleting from caplogs'});
      res.json({msg: 'deleted from caplogs'});
    });
  });

};
