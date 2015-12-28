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

      angular.forEach(alertsData, function(value, key) {
        // remove alert types with no failures
        if (value.total_fail === 0) {
          delete alertsData[key];
        }
      });

      $scope.isEmpty = function() {
        // angular.equals(alertsData, {})
        if (Object.keys(alertsData).length === 0) {
          return true;
        } else {
          $scope.alerts = alertsData;
          return false;
        }
      };

      $scope.alertLevel = function(alert) {
        var cur_ban = alert.cur_ban;
        // var total_ban = alert.total_ban;
        var total_fail = alert.total_fail;
        var level = 'success';

        $scope.cur_ban = 'Currently Banned: ' + cur_ban;
        $scope.total_fail = 'Total failures: ' + total_fail;

        if (total_fail > 0) {
          level = 'warning';
        }

        if (cur_ban > 0) {
          level = 'danger';
        }

        return level;
      };

    });
  });
