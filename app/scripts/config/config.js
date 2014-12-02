/* jslint devel: true */
/* global angular, Photoramp */

//route configuration
Photoramp.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/login", {
        templateUrl: "/app/templates/login.html"
    });
    $routeProvider.when("/photoramp", {
        templateUrl: "/app/templates/photoramp.html"
    });
    $routeProvider.when("/logout", {
        templateUrl: "/app/templates/logout.html"
    });
    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});