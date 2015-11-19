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

      // capitalize the u because pretty
      var uptime = uptimeData.uptime.replace('u', 'U');
      $scope.uptime = uptime;

      // if the system is up for less than 24 hrs show warning
      var day = uptime.search('day');
      $scope.day = function () {
        if (day === -1)
          return 'warning';
        else
          return 'success';
      }

      var last_reboot = 'Last Reboot @ ' + uptimeData.last_reboot;
      $scope.last_reboot = last_reboot;
    });
  });
