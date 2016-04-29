"use strict";

app.factory('projectService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    'pageSize',
    'notifyService',
    function ($http, $q, authService, BASE_URL, pageSize, notifyService) {

        function getAllProjects() {
            var deferred = $q.defer();

            var pageNumber = 1;

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'projects?' + 'filter=Lead.Id=' + '&pageSize=' +
                pageSize + '&pageNumber=' + pageNumber;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function () {
                    notifyService.error('Cannot load projects');
                });

            return deferred.promise;

        }

        function getProjectsByLeadId() {
            var deferred = $q.defer();

            var pageNumber = 1;
            var leadId = JSON.parse(sessionStorage.currentUser).userId;

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'projects?' + 'filter=Lead.Id="' + leadId + '"&pageSize=' +
                pageSize + '&pageNumber=' + pageNumber;            

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function () {
                    notifyService.error('Cannot load projects');
                });

            return deferred.promise;
        }

        function getProjectById(projectId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Projects/' + projectId;

            $http.get(serviceURL)
                .then(function(response){
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }



        function addNewProject(project) {
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'Projects';            

            $http.post(serviceURL, project)
                .then(function (response) {
                    deferred.resolve(response);
                }, function(error){
                    deferred.reject(error);
                });
        }

        function editProjectById(project) {
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'Projects' + project.Id;


            $http.put(serviceURL, project)
                .then(function (response) {
                    deferred.resolve(response);
                }, function(error){
                    deferred.reject(error);
                });
        }

        return {
            getAllProjects: getAllProjects,
            getProjectsByLeadId: getProjectsByLeadId,
            getProjectById: getProjectById,
            addNewProject: addNewProject,
            editProjectById: editProjectById
        };

    }
]);
