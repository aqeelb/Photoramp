/*jslint devel: true*/
/*global Photoramp, OAuth*/
Photoramp.controller("MasterController", function ($location, $rootScope, $q, InstagramService) {
    'use strict';
    console.info("Master Controller Loaded");

    //authenticated user
    $rootScope.user;
    $rootScope.media;
    $rootScope.pagination;
    $rootScope.count = 1;
    

    //initialize OAuth.js with the client id
    InstagramService.initialize();

    //using the OAuth authorization result get user info object
    $rootScope.getSelfData = function () {
        InstagramService.getUser().then(function (response) {
            if (response.meta.code === 200) {
                $rootScope.user = response.data;
            }
        });
    };

    //using the OAuth authorization result user Media
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
    
    //lazy load images
    $rootScope.lazyLoadImages = function () {
//        InstagramService.getNext().then(function (response) {
//                 console.log(response);
//                $rootScope.pagination = response.pagination;
//        });
    }

    //if the user is a returning user route to photoramp
    if (InstagramService.isReady()) {
        console.log(InstagramService.isReady())
        $rootScope.getSelfData();
        $rootScope.getSelfMedia();
        $location.path('/photoramp');
    }
});