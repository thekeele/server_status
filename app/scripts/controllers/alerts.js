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
      var ban = alertsData.ssh.cur_ban;
      var fail = alertsData.ssh.total_fail;
      console.log(fail);

      $scope.sshLevel = function () {
        var level = '';

        if (fail < 0) {
          level = 'success';
        }

        if (fail > 0) {
          level = 'warning';
        }

        if (ban > 0) {
          level = 'danger';
        }
        return level;
      };

      $scope.ssh_ban = 'Currently banned: ' + ban;
      $scope.ssh_fail = 'Total failures: ' + fail;
    });
  });
