/*jslint devel: true*/ 
/*global angular, Photoramp*/
//route configuration
Photoramp.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/login", {
        templateUrl: "/app/templates/login.html",
        controller: "LoginController"
    });
    $routeProvider.when("/photoramp", {
        templateUrl: "/app/templates/photoramp.html",
        controller: "PhotorampController"
    });
    $routeProvider.when("/logout", {
        templateUrl: "/app/templates/logout.html",
        controller: "LogoutController"
    });
    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});