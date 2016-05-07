"use strict";

app.factory('commentService', [
    '$http',
    '$q',
    'authService',
    'BASE_URL',
    function($http, $q, authService, BASE_URL){
        
        function getCommentsByIssueId(issueId) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues/' + issueId + '/comments';

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addCommentByIssueId (issueId, comment) {
            var deferred = $q.defer();

            authService.setAuthHeaders();

            var serviceURL = BASE_URL + 'Issues/' + issueId + '/comments';

            $http.post(serviceURL, comment)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getCommentsByIssueId: getCommentsByIssueId,
            addCommentByIssueId: addCommentByIssueId
        };
    }
]);
