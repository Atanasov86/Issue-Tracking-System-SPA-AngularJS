"use strict";

var app = angular.module('IssueTrackingSystem', ['ngRoute', 'ngNotify', 'ui.bootstrap.pagination', 'underscore']);

app.constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
app.constant('pageSize', 10);

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
        .when('/', {
            templateUrl: 'app/templates/dashboard.html',
            controller: 'IssueController'
        })
        .when('/profile/password', {
            templateUrl: 'app/templates/change-password.html',
            controller: 'AuthenticationController'
        })
        .when('/issues/:id', {
            templateUrl: 'app/templates/issue.html',
            controller: 'ViewIssueController'
        })
        .when('/projects/add-issue', {
            templateUrl: 'app/templates/issue.html',
            controller: 'IssueController'
        })
        .when('/projects', {
            templateUrl: 'app/templates/all-projects.html',
            controller: 'ProjectController'
        })        
        .when('/projects/:id', {
            templateUrl: 'app/templates/project.html',
            controller: 'ViewProjectController'
        })
        .when('/project/:id/edit', {
            templateUrl: 'app/templates/edit-project.html'
        })
        .when('/projects/add', {
            templateUrl: 'app/templates/project.html',
            controller: 'ProjectController'
        })
        .otherwise({
            redirectTo: '/login'
        });
}]);

// app.run(function ($rootScope, $location, authService) {
//     $rootScope.$on('$locationChangeStart', function () {
//         if (!authService.isLoggedIn() && $location.path().indexOf('/register') === -1) {
//             $location.path('/login');
//         }
//     });
// });
