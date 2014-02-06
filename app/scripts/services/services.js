'use strict';


angular.module('triviaApp.services', [])
    .factory('StringService', [function() {

        return {

            areIdentical: function(stringA, stringB) {

                stringA = stringA || '';
                stringB = stringB || '';


                function _sameLength(stringA, stringB) {
                    return  stringA.length == stringB.length;
                }

                function _sameLetters(stringA, stringB) {

                    var l = Math.min(stringA.length, stringB.length);

                    for (var i =0; i<l; i++) {
                        if (stringA.charAt(i) !== stringB.charAt(i)) {
                            return false;
                        }
                    }
                    return true;
                }

                if (_sameLength(stringA, stringB) && _sameLetters(stringA, stringB)) {
                    return true;
                }

                return false;
            }
        }
    }])
    .service('UserService', ['$q', 'DreamFactory', 'ErrorsService', function ($q, DreamFactory, ErrorsService) {

        var user = {
                displayName: '',
                sessionId: ''
            },

            loggedIn = false;


        function _getUser() {
            return user;
        }

        function _setUser(userObj) {
            user = userObj;
        }

        function _setUserDisplayName(userDisplayName) {

            user.displayName = userDisplayName;
        }

        function _setUserSessionId(userSessionId) {

            user.sessionId = userSessionId;
        }

        function _isLoggedIn() {

            return loggedIn;
        }

        function _setLogInStatus(status) {

            loggedIn = status;
        }

        function _login(creds) {

            var defer = $q.defer();

            DreamFactory.api.user.login({body: creds},
                function (data) {
                    defer.resolve(data);
                },

                function (data) {
                    defer.reject(data);
                });

            return defer.promise;

        }

        function _logout() {


            return DreamFactory.api.user.logout();

        }

        function _register(creds) {

            var defer = $q.defer();

            DreamFactory.api.user.register({body: creds},
                function (data) {

                    defer.resolve(data);
                },
                function (data) {

                    defer.reject(data);
                });

            return defer.promise;
        }


        return {
            login: function (creds) {

                var defer = $q.defer();

                _login(creds).then(
                    function (result) {

                        _setUser({
                            displayName: result.display_name,
                            sessionId: result.session_id
                        });

                        _setLogInStatus(true);

                        defer.resolve(true)
                    },
                    function (reason) {
                        defer.reject(reason)
                    });

                return defer.promise;
            },


            logout: function () {

                _logout();
                _setUser({
                    name: '',
                    displayName: '',
                    sessionId: ''
                });
                _setLogInStatus(false);


            },

            isLoggedIn: function () {
                return _isLoggedIn();
            },

            register: function(creds) {

                var defer = $q.defer();

                _register(creds).then(
                    function() {
                        defer.resolve(true)
                    },
                    function(reason) {
                        defer.reject(reason);
                    });

                return defer.promise;

            }

        }
    }])
    .service('ErrorsService', [function () {

        var errors = {};

        function _getErrors() {

            return errors;
        }

        function _setErrors(errorsObj) {

            errors = errorsObj;
        }

        return {

            getErrors: function () {

                return _getErrors();
            },

            setErrors: function (errorsObj) {

                _setErrors(errorsObj);
            }

        }


    }])