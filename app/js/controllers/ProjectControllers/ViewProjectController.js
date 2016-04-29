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

        var currentUser = authService.getCurrentUser().username;

        projectService.getProjectById($routeParams.id)
            .then(function (projectData) {
                $scope.projectData = projectData.data;

                $scope.projectPriorities = _(projectData.data.Priorities).map(function (c) {
                    return c.Name;
                }).join(', ');

                $scope.projectLabels = _(projectData.data.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');

                $scope.isProjectLead = currentUser === projectData.data.Lead.Username;

            }, function (error) {
                notifyService.error(error.Message);
            });

        issueService.getProjectIssuesById($routeParams.id)
            .then(function (issuesData) {
                $scope.projectIssuesData = issuesData.data;
            }, function (error) {
                notifyService.error(error.Message);
            });


        $scope.viewIssue = function (issueId) {
            $location.path('issues/' + issueId);
        };
    }
]);
