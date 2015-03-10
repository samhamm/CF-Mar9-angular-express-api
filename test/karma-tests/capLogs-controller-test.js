'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('caplog-controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  /*global describe, it, before, beforeEach, after, afterEach */

  beforeEach(angular.mock.module('caplogApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() { //test that the tests are working
    var caplogController = $ControllerConstructor('caplogController', {$scope: $scope});
    expect(typeof caplogController).toBe('object');
    expect(Array.isArray($scope.caplog)).toBe(true); //jasmine - toBe, not to.be
  });

  describe('REST requests', function() {
    before(angluar.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAll function', function() {
      $httpBackend.expectGET('api/v1/caplog').respond(200, [{caplogBody: 'test caplog'}]); //test on $scope

      var caplogController = $ControllerConstructor('caplogController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect ($scope.caplog[0].caplogBody).toBe('test caplog');
    });


    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/caplog').respond(200, {_id: 1, caplogBody: 'test caplog'});

      var caplogController = $ControllerConstructor('caplogController', {$scope: $scope});
      $scope.create({caplogBody: 'test caplog'});
      $httpBackend.flush();

      expect($scope.caplog[0]._id).toBe(1);
    });

    it('should be able to save caplog changes', function() {
      $httpBackend.expectPUT('/api/v1/caplog/1').respond(200);

      var caplogController = $ControllerConstructor('caplogController', {$scope: $scope});
      var caplog = {caplogBody: 'test caplog', _id: 1, editing: true};
      $scope.save(caplog);
      $httpBackend.flush();

      expect(caplog.editing).toBe(false);
    });

    it('should be able to delete a caplog', function() {
      $httpBackend.expectDELETE('/api/v1/caplog/1').respond(200);

      var caplogController = $ControllerConstructor('caplogController', {$scope: $scope});
      var caplog = {caplogBody: 'test caplog', _id: 1, editing: true};
      $scope.caplog.push(caplog);
      $scope.remove(caplog);
      $httpBackend.flush();

      expect($scope.caplog.length).toBe(0);
    });
  });
});
