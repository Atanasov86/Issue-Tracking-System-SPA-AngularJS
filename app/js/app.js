"use strict";

var app = angular.module('IssueTrackingSystem', ['ngRoute', 'ngNotify']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/login', {
            templateUrl: 'app/templates/login.html',
            controller: 'AuthenticationController'
        })
        .when('/register', {
            templateUrl: 'app/templates/register.html',
            controller: 'AuthenticationController'
        })
        .when('/home/user', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'UserIssueController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

app.run(function ($rootScope, $location, authService) {
    $rootScope.$on('$locationChangeStart', function () {
        if($location.path().indexOf("/home/") != -1 && !authService.isLoggedIn()) {
            $location.path('/login');
        }
    });

    $rootScope.$on('$locationChangeStart', function () {
        if($location.path().indexOf("/admin/") != -1 && !authService.isAdmin()) {
            $location.path('/login');
        } else if (($location.path().indexOf('/user/') != -1) && authService.isAdmin()){
            $location.path('/admin/home')
        }
    })
});
