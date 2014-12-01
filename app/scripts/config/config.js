/*jslint devel: true*/ 
/*global angular, Photoramp*/
//route configuration
Photoramp.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/login", {
        templateUrl: "/app/templates/login.html",
        controller: "MasterController"
    });
    $routeProvider.when("/photoramp", {
        templateUrl: "/app/templates/photoramp.html",
        controller: "MasterController"
    });
    $routeProvider.when("/logout", {
        templateUrl: "/app/templates/logout.html",
        controller: "MasterController"
    });
    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});