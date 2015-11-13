'use strict';

/**
 * @ngdoc function
 * @name serverStatusApp.controller:UptimeCtrl
 * @description
 * # UptimeCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('UptimeCtrl', function ($scope, UptimeService) {

    uptime = UptimeService.getUptime;
    console.log(uptime);
    $scope.uptime = uptime;

    $scope.last_reboot = 'Last Reboot on Tue. Oct. 12 2015 @ 7:45 pm';
  });
