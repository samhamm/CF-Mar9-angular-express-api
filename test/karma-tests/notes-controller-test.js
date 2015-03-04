'use strict';

require('../../app/js/client');
require('angular-mocks');

describe)('notes-controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() { //test that the tests are working
    var notesController - $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true); //jasmine - toBe, not to.be
  });
});
