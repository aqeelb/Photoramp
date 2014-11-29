/*jslint devel: true*/ 
/*global angular, Photoramp*/
//route configuration
Photoramp.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/login", {
        templateUrl: "app/partials/login.html",
        controller: "loginViewController"
    });
    $routeProvider.when("/photoramp", {
        templateUrl: "app/partials/photoramp.html",
        controller: "photoRampController"
    });
    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});