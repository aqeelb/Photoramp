/*jslint devel: true*/
/*global Photoramp, OAuth*/
Photoramp.controller("MasterController", function ($location, $rootScope, $q, InstagramService) {
    'use strict';
    console.info("Master Controller Loaded");

    //authenticated user
    $rootScope.user = {};
    $rootScope.images;
    $rootScope.maxId = null;
    $rootScope.count = 5;
    $rootScope.isBusy = false;
    $rootScope.loading = true;


    //initialize OAuth.js with the client id
    InstagramService.initialize();

    //using the OAuth authorization result get user info object
    $rootScope.getSelfInfo = function () {
        InstagramService.getUserInfo().then(function (response) {
            if (response.meta.code === 200) {
                $rootScope.user = response.data;
            }
        });
    };

    //using the OAuth authorization result user Media
    $rootScope.getSelfImages = function () {
        InstagramService.getImages().then(function (response) {
            if (response.meta.code === 200) {
                $rootScope.images = response.data;
                console.log($rootScope.images);
            }
        });
    };

    //when the user clicks the connect button, the popup authorization window opens
    $rootScope.connect = function (event) {
        event.preventDefault();
        InstagramService.connectInstagram().then(function () {
            if (InstagramService.isReady()) {
                //when ready get data from instagram and route to the view
                $rootScope.getSelfInfo();
                $rootScope.getSelfImages();
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
        //Testing getimages  via lazy load
        //Will be replaced with the getNexturl Service
        if ($rootScope.loading || $rootScope.isBusy) {
            $rootScope.loading = false;
            return;
        }
        $rootScope.isBusy = true;
        InstagramService.getImages().then(function (response) {
            if (response.meta.code === 200) {
                for (var i = 0; i < response.data.length; i++) {
                    $rootScope.images[$rootScope.images.length] = response.data[i];
                }
                $rootScope.isBusy = false;
            }
        });
    }

    //if the user is a returning user route to photoramp
    if (InstagramService.isReady()) {
        console.log(InstagramService.isReady())
        $rootScope.getSelfInfo();
        $rootScope.getSelfImages();
        $location.path('/photoramp');
    }
});