/*jslint devel: true*/
/*global Photoramp, OAuth, angular*/
//Application Data Factory
angular.module("Photoramp.Services", []).factory("InstagramService", function ($q, $rootScope) {
    "use strict";
    var authorizationResult = false;
    return {
        initialize: function () {
            //initialize OAuth.io with public key of the application
            OAuth.initialize("jpHrhkTMUYBVtVnDEkm9hFn9xlk", {
                cache: true
            });
            authorizationResult = OAuth.create("instagram");
        },
        //Check if OAuth is created
        isReady: function () {
            return authorizationResult;
        },
        //Pops up a window for user credentials
        connectInstagram: function () {
            var deferred = $q.defer();
            OAuth.popup("instagram", {
                cache: true
            }, function (error, result) {
                //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error
                    console.error(error);
                }
            });
            return deferred.promise;
        },
        //cleans OAuth2.0 cache
        clearCache: function () {
            OAuth.clearCache("instagram");
            authorizationResult = false;
        },
        //gets basic user info
        getUserInfo: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get("/v1/users/self").done(
                function (data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        //gets media according to the count
        getImages: function () {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var promise = authorizationResult.get("/v1/users/self/media/recent?count=" + $rootScope.count).done(
                function (data) {
                    deferred.resolve(data);
                });
            return deferred.promise;
        },
        //fetches next set of images
        getNext: function () {
//            var deferred = $q.defer();
//            var promise = authorizationResult.get("/v1/users/self/media/recent?max_id="+$rootScope.pagination.next_max_id+"&count="+$rootScope.count).done(
//                function (data) {
//                    deferred.resolve(data);
//                });
//            return deferred.promise;         
        }
    };
});