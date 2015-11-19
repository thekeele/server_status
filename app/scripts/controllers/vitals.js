'use strict';

/**
 * @name serverStatusApp.controller:VitalsCtrl
 * @description
 * # VitalsCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('VitalsCtrl', function ($scope, VitalsService, $http) {

    // getVitals() returns a promise so use then for processing
    VitalsService.getVitals().then(function(vitalsData) {
      $scope.cpu = vitalsData.cpu
      $scope.memory = vitalsData.memory
      $scope.io = vitalsData.io
    });
  });
