'use strict';

/**
 * @name serverStatusApp.service:AlertsService
 * @description
 * # AlertsService
 * Service of the serverStatusApp
 */
angular.module('serverStatusApp')
  .service('AlertsService', function ($http) {

    var ip_dev = '104.131.81.55';
    var ip_prod = '10.132.213.230';
    var port = '9000';

    // service style, returns a promise
    this.getAlerts = function () {
      return $http.get('http://' + ip_prod + ':' + port + '/alerts').then(function (response) {
        console.log('AlertsService: ', response.data);
        return response.data;
      });
    };

    // factory style, returns a promise
    // return {
    //   getAlerts: function () {
    //     return $http.get('http://104.131.81.55:9000/alerts').then(function (response) {
    //       console.log(response.data);
    //       return response.data;
    //     });
    //   }
    // };
  });
