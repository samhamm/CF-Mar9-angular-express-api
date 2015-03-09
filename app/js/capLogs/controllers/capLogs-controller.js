'use strict';

module.exports = function(app) {
  app.controller('caplogsController', ['$scope', '$http', function($scope, $http) {
    $scope.caplogs = [];
    $scope.getAll = function() {
      $http({
        method: 'GET',
        url: '/api/v1/caplogs'
      })
      .success(function(data) {
        $scope.caplogs = data;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.create = function(caplog) {
      $http({
        method: 'POST',
        url: '/api/v1/caplogs',
        data: caplog
      })
      .success(function(data) {
        $scope.caplogs.push(data);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.save = function(caplog) {
      $http({
        method: 'PUT',
        url: '/api/v1/caplogs/' + caplog._id,
        data: caplog
      })
      .success(function() {
        caplog.editing = false;
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.remove = function(caplog) {
      $http({
        method: 'DELETE',
        url: '/api/v1/caplogs/' + caplog._id
      })
      .success(function() {
        $scope.caplogs.splice($scope.caplogs.indexOf(caplog), 1);
      })
      .error(function(data) {
        console.log(data);
      });
    };

    $scope.editToggle = function(caplog) {
      if (caplog.editing) {
        caplog.caplogBody = caplog.oldCaplogBody;
        caplog.editing = false;
      } else {
        caplog.oldCaplogBody = caplog.caplogBody;
        caplog.editing = true;
      }
    };
  }]);
};
