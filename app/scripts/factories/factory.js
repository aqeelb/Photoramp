/*jslint devel: true*/
/*global Photoramp, OAuth, angular*/
//Application Data Factory
angular.module('Photoramp.Services', []).factory('InstagramService', function ($q) {
        var authorizationResult = false;
        return {
            initialize: function () {
                //initialize OAuth.io with public key of the application
                OAuth.initialize('jpHrhkTMUYBVtVnDEkm9hFn9xlk', {
                    cache: true
                });
                authorizationResult = OAuth.create('instagram');
            },
            isReady: function () {
                return (authorizationResult);
            },
            connectInstagram: function () {
                var deferred = $q.defer();
                OAuth.popup('instagram', {
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
            clearCache: function () {
                OAuth.clearCache('instagram');
                authorizationResult = false;
            },
            getSelf: function () {
                //create a deferred object using Angular's $q service
                var deferred = $q.defer();
                var promise = authorizationResult.get('/v1/users/self').done(
                    function (data) {
                        deferred.resolve(data);
                    });
                return deferred.promise;
            }
        };
});