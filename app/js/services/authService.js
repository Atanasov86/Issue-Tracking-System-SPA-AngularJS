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

            var serviceURL = BASE_URL + 'api/Account/Logout'
        }

        function isLoggedIn() {
            if(sessionStorage['currentUser']){
                return true;
            }

            return false;
        }

        return {
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn
        }
    }]);
