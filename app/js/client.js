
'use strict';

var angular = require('angular/angular');

var capLogsApp = angular.module('capLogsApp', []);

require('./capLogs/controllers/capLogs-controller.js')(capLogsApp);
