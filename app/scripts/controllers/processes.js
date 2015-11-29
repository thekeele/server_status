'use strict';

/**
 * @name serverStatusApp.controller:ProcessesCtrl
 * @description
 * # ProcessesCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('ProcessesCtrl', function ($scope, ProcessesService) {

    // getProcesses() returns a promise so use then for processing
    ProcessesService.getProcesses().then(function(processesData) {

      $scope.processes = processesData;

      $scope.processStatus = function(process) {
        var running = process.match(/running/g);
        var waiting = process.match(/waiting/g);

        if (running !== null && running.toString() === "running") {
          return 'success';
        } else if (waiting !== null && waiting.toString() === "waiting") {
          return 'warning';
        } else {
          return 'danger';
        }
      };

    });
  });
