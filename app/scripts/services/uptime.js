'use strict';

/**
 * @name serverStatusApp.service:UptimeService
 * @description
 * # UptimeService
 * Service of the serverStatusApp
 */
angular.module('serverStatusApp')
  .service('UptimeService', function ($http) {

    var ip_dev = '10.132.213.230';
    var port = '9005';

    // service style, returns a promise
    this.getUptime = function () {
      return $http.get('http://' + ip_dev + ':' + port + '/uptime').then(function (response) {
        console.log('UptimeService: ', response.data);
        return response.data;
      });
    };

    // factory style, returns a promise
    // return {
    //   getUptime: function () {
    //     return $http.get('http://104.131.81.55:9000/uptime').then(function (response) {
    //       console.log(response.data);
    //       return response.data;
    //     });
    //   }
    // };
  });
