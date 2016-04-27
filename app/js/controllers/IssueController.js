"use strict";

app.controller('IssueController', [
    '$scope',
    '$location',
    '$routeParams',
    'issueService',
    'notifyService',
    'authService',
    'pageSize',
    function ($scope, $location, $routeParams, issueService, notifyService, authService, pageSize) {
        $scope.pageStart = 1;
        $scope.pageSize = pageSize;

        var currentUser = authService.getCurrentUser().username;

        $scope.getCurrentUserIssues = function () {
            issueService.getCurrentUserIssues()
                .then(function (response) {
                    $scope.issues = response.data.Issues;
                    console.log($scope.issues);
                    $scope.AllIssues = response.data.TotalPages * $scope.pageSize;

                }, function () {
                    notifyService.error('Cannot load issues.');
                });
        };

        $scope.getProjectIssuesById = function (projectId) {
          issueService.getProjectIssuesById(projectId)
            .then(function(response){
                $scope.projectIssues = response.data;
            }, function(error){
                notifyService.error(error.Message);
            });
        };

        $scope.getProjectIssuesById(14);
        $scope.getIssueById = function (issueId) {
            issueService.getIssueById(issueId)
                .then(function (issueData) {
                    $scope.issueData = issueData.data;
                }, function (error) {
                    notifyService.error(error.Message);
                });
        };
        // console.log($scope.issueData);
        $scope.getIssueByGivenFilter = function () {

        };

        $scope.addNewIssue = function (issue) {

        };

        $scope.editIssue = function (issue) {

        };

        $scope.changeIssueLabelStatus = function (issueId) {

        };

        $scope.getAllIssueComment = function (issueId) {

        };

        $scope.addNewIssueComment = function () {

        };

        $scope.getCurrentUserIssues();


        $scope.viewProject = function (projectId) {
            $location.path('/projects/' + projectId);
        };

        $scope.viewIssue = function (issueId) {
            // issueService.getIssueById(issueId)
            //     .then(function (issueData) {
            //         $scope.issueData = issueData.data;
            //
            //
            //     });

            $location.path('/issues/' + issueId);
        };
        // $scope.viewIssue(227);
        console.log($scope.issueData);
    }
]);
