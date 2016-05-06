"use strict";

app.controller('ProjectController', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'projectService',
    'issueService',
    '_',
    function ($scope, $location, $routeParams, notifyService, projectService, issueService, _) {
        $scope.projectParams = {
            'pageSize': 9,
            'startPage': 1
        };

        $scope.getAllProjects = function () {
            projectService.getAllProjects($scope.projectParams)
                .then(function (response) {
                    $scope.projects = response.Projects;                    
                    $scope.totalProjects = response.TotalCount;
                }, function (error) {
                    notifyService.error('Cannot load projects...', error);
                });
        };

        $scope.getProjectsByLeadId = function () {
            projectService.getProjectsByLeadId()
                .then(function (response) {
                    $scope.allUserProjects = response.data;                    
                }, function(){
                    notifyService.error('Cannot load projects.');
                });
        };

        $scope.getAllProject = function () {
            issueService.getCurrentUserIssues()
                .then(function (response) {
                    var projects = _.uniq(response.data.Issues, function (item, key, a) {
                        return item.Project.Id.toString();
                    });
                    $scope.allUserProjects.push(projects);
                });
        };

        $scope.getProjectsByLeadId();
        $scope.getAllProjects();
    }
]);
