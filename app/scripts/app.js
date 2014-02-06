'use strict';

angular.module('triviaApp', [
        'ngRoute',
        'ngResource',
        'ngDreamFactory'
    ])
    .constant('DSP_URL', 'https://dsp-movie.cloud.dreamfactory.com')
    .constant('DSP_API_KEY', 'launchpad')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
