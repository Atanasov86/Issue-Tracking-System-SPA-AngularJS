"use strict";

app.controller('ProjectController', [
    '$scope',
    '$location',
    'notifyService',
    'projectService',
    'issueService',
    '_',
    function ($scope, $location, notifyService, projectService, issueService, _) {
        $scope.allUserProjects = [];

        $scope.getAllProjects = function () {
            projectService.getAllProjects()
                .then(function (response) {
                    $scope.allProjects = response.Projects;
                    $scope.TotalProjects = response.TotalCount;
                    console.log($scope.allProjects);
                }, function (error) {
                    notifyService.error('Cannot load projects...', error);
                });
        };

        $scope.getProjectsByLeadId = function () {
            projectService.getProjectsByLeadId()
                .then(function (response) {
                    $scope.allUserProjects.push(response.data);
                    console.log($scope.projects);
                }, function(error){
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

        $scope.addNewProject = function (project){
            projectService.addNewProject(project)
                .then(function(){

                }, function(error){

                });
        }

        $scope.getProjectsByLeadId();
        $scope.getAllProject();
        //console.log($scope.allUserProjects);
    }
]);
