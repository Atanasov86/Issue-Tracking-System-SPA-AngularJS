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
                    login(user);
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function login(user) {
            user.grant_type = 'password';

            if(user.Email){
                user.Username = user.Email;
                delete user.Email;
                delete user.ConfirmPassword;
            }
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'api/Token';

            $http.post(serviceURL, $httpParamSerializer(user))
                .then(function (response) {
                    var currentUser = {};
                    currentUser.authToken = response.data.access_token;
                    currentUser.username = response.data.userName;

                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'Users/me',
                        headers: {Authorization: 'Bearer ' + currentUser.authToken}
                    };

                    $http(request)
                        .then(function (userData) {
                            currentUser.isAdmin = userData.data.isAdmin;
                            currentUser.userId = userData.data.Id;
                            sessionStorage.currentUser = JSON.stringify(currentUser);

                            deferred.resolve(userData);
                        });
                }, function (error) {
                    deferred.reject(error);
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
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function changePassword(passwordData) {
            var deferred = $q.defer();

            var serviceURL = BASE_URL + 'api/Account/ChangePassword';

            setAuthHeaders();

            $http.post(serviceURL, passwordData)
                .then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function isLoggedIn() {
            return !!sessionStorage.currentUser;
        }

        function getCurrentUser() {
            var currentUser = sessionStorage.currentUser;
            if (currentUser) {
                return JSON.parse(sessionStorage.currentUser);
            }
        }

        function isAdmin() {
            if(sessionStorage.currentUser === undefined) {
                return false;
            }
            var currentUser = JSON.parse(sessionStorage.currentUser);

            return currentUser.isAdmin;
        }

        function setAuthHeaders() {
            var currentUser = JSON.parse(sessionStorage.currentUser);
            $http.defaults.headers.common.Authorization = 'Bearer ' + currentUser.authToken;
        }

        return {
            register: register,
            login: login,
            logout: logout,
            changePassword: changePassword,
            isAdmin: isAdmin,
            isLoggedIn: isLoggedIn,
            getCurrentUser: getCurrentUser,
            setAuthHeaders: setAuthHeaders
        };
    }
]);
