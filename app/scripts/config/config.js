/*jslint devel: true*/ 
/*global angular, Photoramp*/
//route configuration
Photoramp.config(function ($routeProvider) {
    'use strict';
    $routeProvider.when("/login", {
        templateUrl: "/app/templates/login.html",
        controller: "LoginViewController"
    });
    $routeProvider.otherwise({
        redirectTo: "/login"
    });
});