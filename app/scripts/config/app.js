/*jslint devel: true*/ 
/*global angular*/

//Define Application Namespace and ng-route as dependency
var Photoramp = angular.module("Photoramp", ["ngRoute"]);

//On application run
Photoramp.run(function ($rootScope) {
    "use strict";
    //path to static header view partial
    $rootScope.headerModule = 'app/partials/header.html';
    console.info("Application has been created");
});