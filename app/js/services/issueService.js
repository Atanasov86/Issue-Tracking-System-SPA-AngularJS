"use strict";

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'pageSize',
    'authService',
    function ($http, $q, BASE_URL, pageSize, authService) {

        function getAllMyIssues() {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var pageNumber = 1;
            var orderBy = 'DueDate desc';

            var serviceURL = BASE_URL + '/issues/me?' + 'orderBy=' + orderBy + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getIssueById(issueId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues' + issueId;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getAllIssuesByProjectId(projectId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Projects'+ projectId + 'Issues';

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addIssue(issue) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues';

            $http.post(serviceURL, issue)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changeIssueStatus(statusId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues';

            $http.post(serviceURL, issue)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }



        return {
            getAllMyIssues: getAllMyIssues,
            getIssueById: getIssueById,
            addIssue: addIssue,
            getAllIssuesByProjectId: getAllIssuesByProjectId
        };
    }
]);



