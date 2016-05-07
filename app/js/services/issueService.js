"use strict";

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL', 
    'authService',
    function ($http, $q, BASE_URL, authService) {

        function getCurrentUserIssues(params) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var orderBy = 'DueDate desc';

            var serviceURL = BASE_URL + '/issues/me?' + 'orderBy=' + orderBy + '&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage;

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

            var serviceURL = BASE_URL + 'Issues/' + issueId;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getProjectIssuesById(projectId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Projects/'+ projectId + '/Issues';

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

        function editIssue(issue){
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues/' + issue.Id;

            $http.put(serviceURL, issue)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changeIssueStatus(issueId, statusId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId;

            $http.put(serviceURL, statusId)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }



        return {
            getCurrentUserIssues: getCurrentUserIssues,
            getIssueById: getIssueById,
            addIssue: addIssue,
            editIssue: editIssue,
            getProjectIssuesById: getProjectIssuesById,
            changeIssueStatus: changeIssueStatus
        };
    }
]);
