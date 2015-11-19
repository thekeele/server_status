'use strict';

/**
 * @name serverStatusApp.service:ProcessesService
 * @description
 * # ProcessesService
 * Service of the serverStatusApp
 */
angular.module('serverStatusApp')
  .service('ProcessesService', function ($http) {

    var ip = '104.131.81.55';
    var port = '9000';

    // service style, returns a promise
    this.getProcesses = function () {
      return $http.get('http://' + ip + ':' + port + '/processes').then(function (response) {
        console.log('ProcessesService: ', response.data);
        return response.data;
      });
    };

    // factory style, returns a promise
    // return {
    //   getProcesses: function () {
    //     return $http.get('http://104.131.81.55:9000/processes').then(function (response) {
    //       console.log(response.data);
    //       return response.data;
    //     });
    //   }
    // };
  });
