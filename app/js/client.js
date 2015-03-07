
'use strict';

require('angular/angular');

var logsApp = angular.module('logsApp', []);

require('./logs/controllers/logs_controller')(logsApp);
