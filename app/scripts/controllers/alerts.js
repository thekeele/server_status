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
      $scope.getLevel = function (alert_type) {
        var active_alert = false;
        var ban = alertsData[alert_type].cur_ban;
        var fail = alertsData[alert_type].total_fail;
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

        if (fail > 0) {
          active_alert = true;
        }

        $scope.active_alert = active_alert;
        $scope.alert_type = alert_type;
        $scope.alert_ban = 'Currently banned: ' + ban;
        $scope.alert_fail = 'Total failures: ' + fail;

        return level;
      };
    });
  });
