'use strict';


angular.module('triviaApp.services', [])
    .factory('StringService', [function () {

        return {

            areIdentical: function (stringA, stringB) {

                stringA = stringA || '';
                stringB = stringB || '';


                function _sameLength(stringA, stringB) {
                    return  stringA.length == stringB.length;
                }

                function _sameLetters(stringA, stringB) {

                    var l = Math.min(stringA.length, stringB.length);

                    for (var i = 0; i < l; i++) {
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
    .service('UserService', [function () {

        var user = {
                firstName: null,
                lastName: null,
                displayName: 'Guest',
                sessionId: '',
                lastLogin: null
            },

            loggedIn = false;


        function _getUser() {
            return user;
        }

        function _setUser(userObj) {

            _setUserDisplayName(userObj.display_name);
            _setUserSessionId(userObj.session_id);
            _setUserFirstName(userObj.first_name);
            _setUserLastName(userObj.last_name);
            _setUserLastLoginDate(userObj.last_login);
            _setLogInStatus(true);
        }

        function _unsetUser() {
            user = {
                firstName: null,
                lastName: null,
                displayName: 'Guest',
                sessionId: '',
                lastLogin: null
            };

            _setLogInStatus(false);
        }

        function _setUserDisplayName(userDisplayName) {

            user.displayName = userDisplayName;
        }

        function _setUserSessionId(userSessionId) {

            user.sessionId = userSessionId;
        }

        function _setUserFirstName(userFirstName) {

            user.firstName = userFirstName;
        }

        function _setUserLastName(userLastName) {

            user.lastName = userLastName;
        }

        function _setUserLastLoginDate(userLastLoginDate) {

            user.lastLogin = userLastLoginDate;
        }

        function _isLoggedIn() {

            return loggedIn;
        }

        function _setLogInStatus(status) {

            loggedIn = status;
        }


        return {

            getUser: function () {

                return _getUser();
            },

            setUser: function (user) {

                _setUser(user);
            },

            unsetUser: function () {

                _unsetUser();
            },

            isLoggedIn: function () {

                return _isLoggedIn();
            }
        }
    }])
    .service('MovieService', [function () {
    }]);