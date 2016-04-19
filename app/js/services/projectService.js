"use strict";

app.factory('projectService', [
    '$http',
    '$q',
    'BASE_URL',
    'pageSize',
    'notifyService',
    function ($http, $q, BASE_URL, pageSize, notifyService) {

        function getProjectsByLeadId() {
            var deferred = $q.defer();

            var pageNumber = 1;
            var leadId = JSON.parse(sessionStorage.currentUser).userId;

            var serviceURL = BASE_URL + 'Projects/filter=Lead.Id=' + leadId + '?pageSize=' + pageSize + '&pageNumber=' + pageNumber;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function () {
                    notifyService.error('Cannot load projects');
                });

            return deferred.promise;
        }

        function getProjectById(projectId) {

        }

        function editProjectById(projectId) {

        }

        return {
            getProjectsByLeadId: getProjectsByLeadId
        };

    }
]);

