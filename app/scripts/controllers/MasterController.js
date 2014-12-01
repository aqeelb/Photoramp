/*jslint devel: true*/
/*global Photoramp, OAuth*/
Photoramp.controller("MasterController", function ($location, $rootScope, $q, InstagramService) {
    'use strict';
    console.info("Master Controller Loaded");

    //authenticated user
    $rootScope.user;
    $rootScope.media;


    InstagramService.initialize();

    //using the OAuth authorization result get user data
    $rootScope.getSelfData = function () {
        InstagramService.getUser().then(function (response) {
            if (response.meta.code === 200) {
                $rootScope.user = response.data;
                console.log($rootScope.user);
            }
        });
    };

    //get self media
    $rootScope.getSelfMedia = function () {
        InstagramService.getMedia().then(function (response) {
            if (response.meta.code === 200) {
                $rootScope.media = response.data;
                console.log(response);
            }
        });
    };

    //when the user clicks the connect button, the popup authorization window opens
    $rootScope.connect = function (event) {
        event.preventDefault();
        InstagramService.connectInstagram().then(function () {
            if (InstagramService.isReady()) {
                //when ready get data from instagram and route to the view
                $rootScope.getSelfData();
                $rootScope.getSelfMedia();
                $location.path('/photoramp');
            }
        });
    }

    //Clear cache annd route to logout view
    $rootScope.logOut = function () {
        InstagramService.clearCache();
        $location.path('/logout');
    }

    //if the user is a returning user route to photoramp
    if (InstagramService.isReady()) {
        $rootScope.getSelfData();
        $rootScope.getSelfMedia();
        $location.path('/photoramp');
    }
});