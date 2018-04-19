'use strict';

app.controller('playerController', ['$scope', '$timeout', 'focusController', 'CONSTANT', function($scope, $timeout, focusController, CONSTANT) {

    var mediaControllerTimer;

    $scope.showMediaController = false;

    $scope.mediaControls = {};

    $scope.$on('$viewContentLoaded', function() {
        $scope.mediaControls.preparePlayer({
            url: 'http://27.67.50.6:18080/71.m3u8?AdaptiveType=HLS&VOD_RequestID=U6tIRX+QtmFBXhLTgqa7ueyBtmHx5QAI3mRpdZ2Q7ux7K53vZQMpmfIQhMqTkuSfxEEhZyA30cYh+2npdE92tw==',
            resolutionWidth: '1920'
        })
        $timeout(function() {
            $scope.mediaControls.play();
//            focusController.focus('btnPlayerPlay');
        }, CONSTANT.EFFECT_DELAY_TIME);
    });

//    $scope.$on('$destroy', function() {
//        $scope.mediaControls.close();
//    });

    $scope.setMediaControllerTimer = function() {
        $scope.showMediaController = true;
        if (mediaControllerTimer) {
            $timeout.cancel(mediaControllerTimer);
        }
        mediaControllerTimer = $timeout(function() {
            $scope.showMediaController = false;
            mediaControllerTimer = null;
        }, CONSTANT.MEDIA_CONTROLLER_TIMEOUT);
    };

    $scope.back = function() {
        $scope.mediaControls.stop();
        $window.history.back();
    };

    var moveContainer = function(category, regionId, targetTop) {
        if (category === $scope.currentCategory) {
            return;
        }
        $('#' + regionId).css({
            transform: 'translate3d(0, ' + targetTop + 'px, 0)'
        });
        $scope.currentCategory = category;
    };

    focusController.addBeforeKeydownHandler(function(context) {
        if ($scope.showMediaController === false) {
            $scope.setMediaControllerTimer();
            return false;
        } else {
            $scope.setMediaControllerTimer();
        }
        switch (context.event.keyCode) {
            case CONSTANT.KEY_CODE.RETURN:
            case CONSTANT.KEY_CODE.ESC:
                $scope.back();
                break;
        }
    });

}]);