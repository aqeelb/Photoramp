/*jslint devel: true*/ 
/*global angular*/

//Define Application Namespace and ng-route as dependency
var Photoramp = angular.module("Photoramp", ["ngRoute"]);

//On application run
Photoramp.run(function ($rootScope) {
    "use strict";
    
    //Testing
    $rootScope.navbar = 'app/templates/navbar.html';
    $rootScope.photoramp = 'app/templates/photoramp.html';
    $rootScope.login = 'app/templates/login.html';
    
    console.info("Application has been created");
});