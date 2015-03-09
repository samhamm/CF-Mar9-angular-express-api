'use strict';

require('angular/angular');

var caplogsApp = angular.module('caplogsApp', []);

require('./caplogs/controllers/caplogs-controller')(caplogsApp);
