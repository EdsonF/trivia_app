'use strict';

angular.module('triviaApp')
    .controller('NavCtrl', ['$scope', 'UserService',
        function ($scope) {

            $scope.loggedIn = false;


            $scope.$on('user:loggedIn', function (e) {
                $scope.loggedIn = true;
            });

            $scope.$on('user:logout', function (e) {
                $scope.loggedIn = false;
            });
        }])

    .controller('ErrorsCtrl', ['$scope', function($scope) {

        $scope.errors = [];


        $scope.$on('app:error', function(e, error) {

            $scope.errors.push(error);
        });

        $scope.$on('app:error:clear', function(e) {

            $scope.errors = [];
        })



    }])
    .controller('TriviaCtrl', ['$scope', 'MovieService', 'UserService', function ($scope, MovieService, UserService) {


        $scope.user = UserService.getUser();

    }])
    .controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'UserService', 'DreamFactory',
        function ($scope, $rootScope, $location, UserService, DreamFactory) {


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


                var postData = {
                    body: creds

                };

                DreamFactory.api.user.login(postData,
                    function(data) {
                        UserService.setUser(data);
                        $rootScope.$broadcast('user:loggedIn');
                        $location.url('/');
                        $scope.$apply();
                    },
                    function(data) {
                        $scope.$apply(function() {
                            throw {message: 'Unable to login.'}

                        })
                    });
            })
        }])
    .controller('RegisterCtrl', ['$scope', '$rootScope', '$location', 'StringService', 'DreamFactory', 'UserService',
        function ($scope, $rootScope, $location, StringService, DreamFactory, UserService) {

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

                var data = {
                    body: {
                        email: creds.email,
                        new_password: creds.password
                    }
                };

                DreamFactory.api.user.register(data,
                    function (data) {
                        UserService.setUser(data);
                        $rootScope.$broadcast('user:loggedIn');
                        $location.url('/');
                        $scope.$apply();
                    },
                    function (data) {

                        $scope.$apply(function() {

                            throw {message: 'Unable to Register.'}
                        })
                    });
            })
        }]);
