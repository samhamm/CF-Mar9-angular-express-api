'use strict';

module.exports = function(app) {
  app.controller('capLogsController', ['$scope', '$http', function($scope, $http) {
    $scope.capLogs = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/capLogs'
      })
      .success(function(data) {
        $scope.capLogs = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(capLog) {
      $http({
        method: 'POST',
        url: '/api/v1/capLogs',
        data: capLog
      })
      .success(function(data) {
        $scope.capLogs.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(capLog) {
      $http({
        method: 'PUT',
        url: '/api/v1/capLogs/' + capLog._id,
        data: capLog
      })
      .success(function() {
        capLog.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(capLog) {
      $http({
        method: 'DELETE',
        url: '/api/v1/capLogs/' + capLog._id
      })
      .success(function() {
        $scope.capLogs.splice($scope.capLogs.indexOf(capLog), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(capLog) {
      if (capLog.editing) {
        capLog.capLogBody = capLog.oldCapLogBody;
        capLog.editing = false;
      } else {
        capLog.oldCapLogBody = capLog.capLogBody;
        capLog.editing = true;
      }
    };
  }]);
};
