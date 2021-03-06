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

      angular.forEach(processesData, function(value, key) {
        // remove process id from string
        processesData[key] = value.split(',')[0];
      });

      $scope.processes = processesData;

      $scope.processUrl = function(process) {
        var url = 'https://dev.keele.codes/';

        var lux = process.match(/lux/g);
        var fingers = process.match(/homo_fingr/g);

        if (lux !== null) {
          return url + 'lux';
        } else if (fingers !== null) {
          return url + 'fingers';
        } else {
          return;
        }
      }

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
