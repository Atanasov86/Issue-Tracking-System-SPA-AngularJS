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

        $scope.isAdmin = authService.isAdmin();


        var currentUser = authService.getCurrentUser().username;
        
        issueService.getIssueById($routeParams.id)
            .then(function (issueData) {
                $scope.issueData = issueData;

                $scope.issueDate = new Date(issueData.DueDate);

                $scope.issueLabels = _(issueData.Labels).map(function (l) {
                    return l.Name;
                }).join(', ');

                $scope.isProjectLead = issueData.Author.Username === currentUser;
                console.log(issueData);
                $scope.isAssignee = issueData.Assignee.Username === currentUser;

            }, function (error) {
                notifyService.error(error.Message);
            });
    }
]);
