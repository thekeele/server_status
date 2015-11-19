'use strict';

/**
 * @name serverStatusApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('AlertsCtrl', function ($scope, AlertsService) {

    // getAlerts() returns a promise so use then for processing
    AlertsService.getAlerts().then(function(alertsData) {
      $scope.ssh = 'SSH: ' + alertsData.ssh;
      $scope.noscript = 'Noscript: ' + alertsData.noscript;
    });
  });
