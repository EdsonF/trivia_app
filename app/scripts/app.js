'use strict';

angular.module('triviaApp', [
        'ngRoute',
        'ngResource',
        'ngDreamFactory',
        'triviaApp.directives',
        'triviaApp.services'
    ])
    .constant('DSP_URL', 'https://dsp-movie.cloud.dreamfactory.com')
    .constant('DSP_API_KEY', 'launchpad')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'TriviaCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl'
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl'
            })
            .when('/logout', {
                resolve: {
                    logout: ['$location', '$rootScope', 'UserService', function($location, $rootScope, UserService) {

                        UserService.logout();
                        $rootScope.$broadcast('user:logout');
                        $location.url('/');
                    }]
                }
            })
            .otherwise({
                redirectTo: '/'
            });
    }])
    .config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
            return function (exception, cause) {
                console.log(exception.message);
                alert(exception.message);
                return $delegate(exception, cause);
            }
        }]);
    }]);