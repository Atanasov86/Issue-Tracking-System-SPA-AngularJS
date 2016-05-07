"use strict";

app.controller('ViewProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'authService',
    'projectService',
    'issueService',
    '_',
    function ($scope, $location, $routeParams, notifyService, authService, projectService, issueService, _) {

        $scope.isDisabled = true;
        
        $scope.isAdmin = authService.isAdmin();

        var currentUser = authService.getCurrentUser().username;

        projectService.getProjectById($routeParams.id)
            .then(function (projectData) {
                $scope.projectData = projectData;

                $scope.projectPriorities = _(projectData.Priorities).map(function (c) {
                    return c.Name;
                }).join(', ');

                $scope.projectLabels = _(projectData.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');

                $scope.isProjectLead = currentUser === projectData.Lead.Username;

            }, function (error) {
                notifyService.error(error.Message);
            });

        issueService.getProjectIssuesById($routeParams.id)
            .then(function (issuesData) {
                $scope.projectIssuesData = issuesData.data;
                console.log($scope.projectIssuesData);
            }, function (error) {
                notifyService.error(error.Message);
            });


        $scope.viewIssue = function (issueId) {
            $location.path('issues/' + issueId);
        };
    }
]);
