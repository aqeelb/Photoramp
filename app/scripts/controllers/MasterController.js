/*jslint devel: true*/
/*global Photoramp, OAuth*/
Photoramp.controller("MasterController", function ($scope, $q, InstagramService) {
    'use strict';
    console.info("Master Controller Loaded");
    
    $scope.self;
    
    InstagramService.initialize();
    
    //using the OAuth authorization result get user data
    $scope.refreshTimeline = function() {
        InstagramService.getSelf().then(function(data) {
            $scope.self = data;
            console.log($scope.self);
        });
    };
    
    //when the user clicks the connect button, the popup authorization window opens
    $scope.connectButton = function() {
        InstagramService.connectInstagram().then(function() {
            if (InstagramService.isReady()) {
                //if the authorization is successful, then route to view
            }
        });
    }
    
    $scope.signOut = function() {
        InstagramService.clearCache();
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $scope.refreshTimeline();
    }
});