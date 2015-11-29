'use strict';

/**
 * @name serverStatusApp.controller:VitalsCtrl
 * @description
 * # VitalsCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('VitalsCtrl', function ($scope, VitalsService) {

    $scope.buttons = true;

    // getVitals() returns a promise so use then for processing
    $scope.vitalsPromise = VitalsService.getVitals().then(function(vitalsData) {

      var user = vitalsData.cpu.user_percent;
      var system = vitalsData.cpu.system_percent;
      var idle = vitalsData.cpu.idle_percent;

      var kb_free = vitalsData.mem.kb_free;
      var kb_used = vitalsData.mem.kb_used;
      var percent_used = vitalsData.mem.percent_used;

      var trans_per_sec = vitalsData.io.trans_per_sec;
      var read_per_sec = vitalsData.io.read_per_sec;
      var write_per_sec = vitalsData.io.write_per_sec;

      $scope.cpuLoad = function () {
        if (user < 25 && system < 25) {
          return 'success';
        } else if (user < 50 && system < 50) {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.memLoad = function () {
        if (percent_used < 25) {
          return 'success';
        } else if (percent_used < 50) {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.ioLoad = function () {
        if (trans_per_sec < 0.50) {
          return 'success';
        } else if (trans_per_sec < 1) {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.buttons = false;

      $scope.user = 'User ' + user + '%';
      $scope.system = 'System ' + system + '%';
      $scope.idle = 'Idle ' + idle + '%';

      $scope.kb_free = 'Free ' + kb_free + 'kb';
      $scope.kb_used = 'Used ' + kb_used + 'kb';
      $scope.percent_used = 'Used ' + percent_used + '%';

      $scope.trans_per_sec = 'Transfers ' + trans_per_sec + 's';
      $scope.read_per_sec = 'Reads ' + read_per_sec + 's';
      $scope.write_per_sec = 'Write ' + write_per_sec + 's';
    });
  });
