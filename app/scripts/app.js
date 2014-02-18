'use strict';

angular.module('triviaApp', [
        'ngRoute',
        'ngDreamFactory',
        'triviaApp.directives',
        'triviaApp.services'
    ])
    .constant('DSP_URL', 'https://next.cloud.dreamfactory.com')
    .constant('DSP_API_KEY', 'trivia')
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
                    logout: ['$location', '$rootScope', 'UserService', 'DreamFactory', 'ScoreKeeper',
                        function ($location, $rootScope, UserService, DreamFactory, ScoreKeeper) {

                            DreamFactory.api.user.logout();
                            UserService.unsetUser();
                            ScoreKeeper.resetScore();
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
        $provide.decorator('$exceptionHandler', ['$delegate', '$injector', function ($delegate, $injector) {
            return function (exception, cause) {

                $injector.get('$rootScope').$broadcast('app:error', exception.message);
                return $delegate(exception, cause);
            }
        }]);
    }])
    .run(['$rootScope', function($rootScope) {


        $rootScope.$on('$routeChangeStart', function(scope, next, current) {

            $rootScope.$broadcast('app:error:clear');

        })
    }])