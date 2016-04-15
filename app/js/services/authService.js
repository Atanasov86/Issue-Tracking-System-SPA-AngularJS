"use strict";

app.factory('authService', [
    '$http',
    '$q',
    'BASE_URL',
    '$httpParamSerializer',
    function ($http, $q, BASE_URL, $httpParamSerializer) {

        function register(user) {
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'api/Account/Register';

            $http.post(serviceURL, user)
                .then(function (response) {
                    console.log(response);
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function login(user) {
            user.grant_type = 'password';
            
            var deferred = $q.defer();            
            
            var serviceURL = BASE_URL + 'api/Token';
            
            $http.post(serviceURL, $httpParamSerializer(user))
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error)
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'api/Account/Logout';

            $http.post(serviceURL, null)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error)
                });

            return deferred.promise;
        }

        function isLoggedIn() {
            return sessionStorage['currentUser'];
        }

        function getCurrentUser() {
            return sessionStorage['currentUser'];
        }

        function isAdmin() {
            setAuthHeaders();

            var serviceURL = BASE_URL + 'Users/me';

            $http.get(serviceURL)
                .then(function (response) {
                    sessionStorage.isAdmin = response.data.isAdmin;
                    sessionStorage.userId = response.data.Id;
                }, function (error) {
                    console.log(error)
                });
        }

        function setAuthHeaders() {
            $http.defaults.headers.common.Authorization = 'Bearer ' + sessionStorage.authToken;
        }

        return {
            register: register,
            login: login,
            logout: logout,
            isAdmin: isAdmin,
            isLoggedIn: isLoggedIn,
            getCurrentUser: getCurrentUser,
            setAuthHeaders: setAuthHeaders
        }
    }]);
