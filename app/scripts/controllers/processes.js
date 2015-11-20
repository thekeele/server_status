'use strict';

/**
 * @name serverStatusApp.controller:ProcessesCtrl
 * @description
 * # ProcessesCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('ProcessesCtrl', function ($scope, ProcessesService) {

    // getProcesses() returns a promise so use then for processing
    ProcessesService.getProcesses().then(function(processesData) {
      var nginx = processesData.nginx;
      var blog = processesData.blog;
      var lux = processesData.lux;

      $scope.nginxStatus = function () {
        if (nginx.match(/running/g) == "running") {
          return 'success';
        } else if (nginx.match(/waiting/g) == "waiting") {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.blogStatus = function () {
        if (blog.match(/running/g) == "running") {
          return 'success';
        } else if (blog.match(/waiting/g) == "waiting") {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.luxStatus = function () {
        if (lux.match(/running/g) == "running") {
          return 'success';
        } else if (lux.match(/waiting/g) == "waiting") {
          return 'warning';
        } else {
          return 'danger';
        }
      };

      $scope.nginx = nginx;
      $scope.blog = blog;
      $scope.lux = lux;
    });
  });
