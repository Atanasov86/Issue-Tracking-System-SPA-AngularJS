"use strict";

app.controller('ViewIssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'authService',
    'projectService',
    'notifyService',
    '_',
    function ($scope, $location, $routeParams, issueService, authService, projectService, notifyService, _) {
        
        $scope.isDisabled = true;
        
        issueService.getIssueById($routeParams.id)
            .then(function (issueData) {
                $scope.issueData = issueData.data;

                $scope.issueDate = new Date(issueData.data.DueDate);

                $scope.issueLabels = _(issueData.data.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');
                console.log(issueData.data);

            }, function (error) {
                notifyService.error(error.Message);
            });
    }
]);
