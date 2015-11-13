'use strict';

/**
 * @ngdoc function
 * @name serverStatusApp.controller:UptimeCtrl
 * @description
 * # UptimeCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .service('UptimeService', function ($resource) {
    this.getUptime = function () {
      console.log('uptime service');
      return $resource('http://104.131.81.55:9000/uptime');
    };
  });
