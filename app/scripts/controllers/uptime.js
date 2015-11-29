'use strict';

/**
 * @name serverStatusApp.controller:UptimeCtrl
 * @description
 * # UptimeCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('UptimeCtrl', function ($scope, UptimeService) {

    // getUptime() returns a promise so use then for processing
    UptimeService.getUptime().then(function(uptimeData) {
      $scope.uptime = uptimeData.uptime;

      // if the system is up for less than 24 hrs show warning
      var day = uptimeData.uptime.search('day');
      $scope.day = function () {
        if (day === -1) {
          return 'warning';
        }
        else {
          return 'success';
        }
      };

      $scope.last_reboot = 'Last Reboot ' + uptimeData.last_reboot + ' EST';
    });
  });
