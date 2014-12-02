/*jslint devel: true*/
/*global Photoramp, OAuth, $, document*/

Photoramp.controller("MasterController", function ($location, $rootScope, InstagramService) {
    'use strict';
    console.info("Master Controller Loaded");
    //authenticated user    
    $rootScope.user = {};
    $rootScope.images = null;
    $rootScope.maxId = null;
    //$rootScope.nextUrl = null;
    $rootScope.count = 6;
    $rootScope.isBusy = false;
    $rootScope.loading = true;

    //initialize OAuth.js with the client id
    InstagramService.initialize();

    //when the user clicks the connect button, the popup authorization window opens
    $rootScope.connect = function (event) {
        event.preventDefault(); 
        InstagramService.connectInstagram().then(function () {
            if (InstagramService.isReady()) {
                //when ready get data from instagram and route to the view 
                $rootScope.getSelfInfo();
                $rootScope.getSelfImages();
                $rootScope.showLogOut = true;
                $rootScope.layout.loader = true;
                $location.path('/photoramp');
            }
        });
    };

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
                $rootScope.maxId = response.pagination.next_max_id;
                $rootScope.layout.loader = false;
            }
        });
    };
 
    //Clear cache annd route to logout view
    $rootScope.logOut = function () {
        InstagramService.clearCache();
        //Seems instagram logout can be performed by loading below url
        //Documentation is vague :(
        //Little DOM Manipulation ain't that bad. :D
        var s = document.createElement("script");
        s.src = "https://instagram.com/accounts/logout";
        $("head").append(s);
        $rootScope.showLogOut = false;
        $location.path('/login');
    };

    //lazy load images
    $rootScope.lazyLoadImages = function () {
        //Testing getimages  via lazy load
        //Will be replaced with the getNexturl Service
        if ($rootScope.loading || $rootScope.isBusy) {
            $rootScope.loading = false;
            return;
        }
        //check data if no data is available then return
        if ($rootScope.maxId === undefined) {
            return;
        }
        $rootScope.isBusy = true;
        $rootScope.layout.loader = true;
        InstagramService.getNext().then(function (response) {
            var i = 0;
            if (response.meta.code === 200) {
                for (i; i < response.data.length; i += 1) {
                    $rootScope.images[$rootScope.images.length] = response.data[i];
                }
                $rootScope.maxId = response.pagination.next_max_id;
                $rootScope.isBusy = false;
                $rootScope.layout.loader = false;
            }
        });
    };

    //if the user is a returning user route to photoramp
    if (InstagramService.isReady()) {
        $rootScope.layout.loader = true;
        $rootScope.getSelfInfo();
        $rootScope.getSelfImages();
        $rootScope.showLogOut = true;
        $location.path('/photoramp');
    }
});