"use strict";

app.factory('userService', [
    '$http',
    '$q',
    'BASE_URL',
    'authService',
    function ($http, $q, BASE_URL, authService){

        function getAllUsers(){
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'Users/';
            authService.setAuthHeaders();

            $http.get(serviceURL)
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
            
            return deferred.promise;
        }

        function makeAdmin(userId){
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'Users/makeadmin';
            authService.setAuthHeaders();

            $http.put(serviceURL, userId)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        return {
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin
        };
    }
]);
