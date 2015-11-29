'use strict';

/**
 * @ngdoc overview
 * @name serverStatusApp
 * @description
 * # serverStatusApp
 *
 * Main module of the application.
 */
angular
  .module('serverStatusApp', ['ngAnimate', 'cgBusy']);

angular.module('serverStatusApp').config(function($httpProvider) {
  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;

  //Remove the header used to identify ajax call that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
