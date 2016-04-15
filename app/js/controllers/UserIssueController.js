"use strict";

app.controller('UserIssueController', [
    '$scope',
    '$http',
    'issueService',
    'notifyService',
    function ($scope, $http, issueService, notifyService) {
        
        $scope.getMyIssues = function () {
            issueService.getMyIssues()
                .then(function (response) {
                    console.log(response.data)
                    $scope.issues = response.data;
                    console.log(response)
                }, function (error) {
                    console.log(error);
                })
        };

        $scope.getMyIssues();
}]);
