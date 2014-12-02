/*jslint devel: true*/
/*global angular*/

//Define Application Namespace and ng-route as dependency
var Photoramp = angular.module("Photoramp", ["ngRoute", "Photoramp.Services", "infinite-scroll"]);

//On application run
Photoramp.run(function ($rootScope, $location, $timeout) {
    "use strict";
    console.info("Application has been created");
    $rootScope.config = {};
    $rootScope.config.app_url = $location.url();
    $rootScope.layout = {};
    $rootScope.showLogOut = false;
    $rootScope.navbar = '/app/templates/navbar.html';
});