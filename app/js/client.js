'use strict';

var angular = require('angular/angular');

var caplogsApp = angular.module('caplogsApp', []);

require('./caplogs/controllers/caplogs-controller.js')(caplogsApp);
