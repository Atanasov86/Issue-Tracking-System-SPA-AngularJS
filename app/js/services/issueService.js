"use strict";

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'authService',
    function ($http, $q, BASE_URL, authService) {
        
        function getMyIssues() {
            var deferred = $q.defer();
            authService.setAuthHeaders();
            var pageSize = 4;
            var pageNumber = 1;
            var orderBy = 'orderBy=DueDate desc';

            var serviceURL = BASE_URL + '/issues/me?' + orderBy + '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response)
                }, function (error) {
                    deferred.reject(error)
                });

            return deferred.promise;
        }

        return {
            getMyIssues: getMyIssues
        }
    }]);
