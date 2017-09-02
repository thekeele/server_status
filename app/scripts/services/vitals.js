'use strict';

/**
 * @name serverStatusApp.service:VitalsService
 * @description
 * # VitalsService
 * Service of the serverStatusApp
 */
angular.module('serverStatusApp')
  .service('VitalsService', function ($http) {

    var ip_dev = 'dev.keele.codes';
    var port = '9443';

    // service style, returns a promise
    this.getVitals = function () {
      return $http.get('//' + ip_dev + ':' + port + '/vitals').then(function (response) {
        console.log('VitalsService: ', response.data);
        return response.data;
      });
    };

    // factory style, returns a promise
    // return {
    //   getVitals: function () {
    //     return $http.get('http://104.131.81.55:9000/vitals').then(function (response) {
    //       console.log(response.data);
    //       return response.data;
    //     });
    //   }
    // };
  });
