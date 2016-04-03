'use strict';

/**
 * @name serverStatusApp.controller:QuoteCtrl
 * @description
 * # QuoteCtrl
 * Controller of the serverStatusApp
 */
angular.module('serverStatusApp')
  .controller('QuoteCtrl', function ($scope) {
      var quotes = [
        'Mistakes are always forgivable, if one has the courage to admit them.',
        'If you spend too much time thinking about a thing, you\'ll never get it done.',
        'To hell with circumstances; I create opportunities.',
        'A goal is not always meant to be reached, it often serves simply as something to aim at.',
        'A wise man can learn more from a foolish question than a fool can learn from a wise answer.',
        'I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.',
        'Notice that the stiffest tree is most easily cracked, while the bamboo or willow survives by bending with the wind.',
        'Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it.',
        'Adapt what is useful, reject what is useless, and add what is specifically your own.',
        'The key to immortality is first living a life worth remembering.'
      ];
      var min = 0;
      var max = (quotes.length - 1);
      var random = Math.floor(Math.random() * (max - min + 1)) + min;
      $scope.quote = quotes[random];
  });
