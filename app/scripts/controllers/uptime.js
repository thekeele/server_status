'use strict';

/**
 * @ngdoc function
 * @name serverStatusApp.controller:UptimeCtrl
 * @description
 * # UptimeCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('UptimeCtrl', function ($scope) {
    $scope.uptime = 'Uptime is 3 days 4 hours and 5 minute';
    $scope.last_restart = 'Last Restart on Tue. Oct. 12 2015 @ 7:45 pm';
  });
