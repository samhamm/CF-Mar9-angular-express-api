'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('notes-controller', function() {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;

  beforeEach(angular.mock.module('notesApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller;
  }));

  it('should be able to create a controller', function() { //test that the tests are working
    var notesController = $ControllerConstructor('notesController', {$scope: $scope});
    expect(typeof notesController).toBe('object');
    expect(Array.isArray($scope.notes)).toBe(true); //jasmine - toBe, not to.be
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
      $httpBackend.expectGET('api/v1/notes').respond(200, [{noteBody: 'test note'}]); //test on $scope

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      $scope.getAll();
      $httpBackend.flush();

      expect ($scope.notes[0].noteBody).toBe('test note');
    });


    it('should be able to save', function() {
      $httpBackend.expectPOST('/api/v1/notes').respond(200, {_id: 1, noteBody: 'test note'});

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      $scope.create({noteBody: 'test note'});
      $httpBackend.flush();

      expect($scope.notes[0]._id).toBe(1);
    });

    it('should be able to save note changes', function() {
      $httpBackend.expectPUT('/api/v1/notes/1').respond(200);

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      var note = {noteBody: 'test note', _id: 1, editing: true};
      $scope.save(note);
      $httpBackend.flush();

      expect(note.editing).toBe(false);
    });

    it('should be able to delete a note', function() {
      $httpBackend.expectDELETE('/api/v1/notes/1').respond(200);

      var notesController = $ControllerConstructor('notesController', {$scope: $scope});
      var note = {noteBody: 'test note', _id: 1, editing: true};
      $scope.notes.push(note);
      $scope.remove(note);
      $httpBackend.flush();

      expect($scope.notes.length).toBe(0);
    });
  });
});
