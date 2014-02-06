'use strict';

angular.module('triviaApp')
    .controller('NavCtrl', ['$scope', 'UserService',
        function ($scope, UserService) {

            $scope.loggedIn = false;
            console.log($scope.loggedIn);


            $scope.$on('user:loggedIn', function (e) {
                $scope.loggedIn = true;
            });

            $scope.$on('user:logout', function (e) {
                $scope.loggedIn = false;
            });
        }])
    .controller('TriviaCtrl', ['$scope', function () {


    }])
    .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'UserService',
        function ($scope, $rootScope, $location, UserService) {


            // Vars
            $scope.creds = {
                email: '',
                password: ''
            };

            // Public API
            $scope.login = function (creds) {

                $scope.$broadcast('user:login', creds)
            };


            // Private API


            // Handle Messages
            $scope.$on('user:login', function (e, creds) {

                console.log(creds);

                UserService.login(creds).then(function () {
                    $location.url('/');
                    $rootScope.$broadcast('user:loggedIn');
                }, function () {
                    throw {message: 'Unable to login.'}
                })
            })
        }])
    .controller('RegisterCtrl', ['$scope', '$rootScope', '$location', 'StringService', 'UserService',
        function ($scope, $rootScope, $location, StringService, UserService) {

            // Vars
            $scope.creds = {
                email: '',
                password: '',
                confirm: ''
            };


            // Public API
            $scope.register = function (creds) {

                if ($scope.identical == false) {
                    return false
                }


                $scope.$broadcast('user:register', creds)
            };

            $scope.verifyUserPassword = function (creds) {

                console.log(creds);
                $scope.$broadcast('verify:password', creds);
            };


            // Private API
            function _verifyPassword(creds) {
                return StringService.areIdentical(creds.password, creds.confirm);
            }


            // Handle Messages
            $scope.$on('verify:password', function (e, creds) {

                $scope.identical = _verifyPassword(creds);
            });

            $scope.$on('user:register', function (e, creds) {

                UserService.register(creds).then(function () {
                    $rootScope.$broadcast('user:registered');

                    UserService.login(creds).then(function () {
                        $location.url('/');
                        $rootScope.$broadcast('user:loggedIn');
                    })
                })
            })
        }]);
