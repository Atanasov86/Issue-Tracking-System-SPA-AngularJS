'use strict';

angular.module('IssueTrackingSystem.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('#/', {
    templateUrl: 'app/home/home.html',
    controller: 'homeController'
  });
}])

.controller('homeController', [function() {

}]);
