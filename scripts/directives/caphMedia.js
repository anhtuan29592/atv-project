angular.module('caph.media', ['caph.ui'], ['$provide', '$compileProvider', function($provide, $compileProvider) {
    $compileProvider.directive({
        caphMedia: ['$parse', '$document', function($parse, $document) {
            var CONSTANT = {
                FORWARD_INTERVAL: 15
            };

            var defaultResolutionWidth = 1920;
            var document = $document[0],
                documentElement = document.documentElement;

            var isFullScreenEnabled = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled;
            var isFullScreen, requestFullScreen, exitFullScreen;

            var listener = {
                onevent: function(eventType, eventData) {
                    console.log("event type: " + eventType + ", data: " + eventData);
                    ($parse($attrs[$attrs.$normalize('on-' + eventType)]) || angular.noop)($scope, {
                        $event: event
                    });
                }
            };

            if (isFullScreenEnabled) {
                ['fullscreenElement', 'webkitFullscreenElement', 'mozFullScreenElement', 'msFullscreenElement'].some(function(property) {
                    if (document[property] !== undefined) {
                        isFullScreen = property;
                        return true;
                    }
                });

                ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'].some(function(method) {
                    if (documentElement[method]) {
                        requestFullScreen = method;
                        return true;
                    }
                });

                ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'].some(function(method) {
                    if (document[method]) {
                        exitFullScreen = method;
                        return true;
                    }
                });
            }

            return {
                restrict: 'E',
                transclude: true,
                scope: true,
                controller: function($scope, $element, $attrs, $transclude) {
                    var media;
                    var originalStyle = {};

                    function doFullScreen(callback) {
                        if (isFullScreenEnabled) {
                            callback($element[0]);
                        } else {
                            console.warn('Full-Screen API is not supported.');
                        }
                    }

                    $transclude(function(clone) {
                        $element.append(clone);
                    });

                    $scope.$on('$destroy', function() {
                        $element.remove();
                    });

                    $element.on('fullscreenchange webkitfullscreenchange mozfullscreenchange MSFullscreenChange', function() {
                        if (document[isFullScreen]) {
                            this.style.display = 'block';
                            this.style.width = '100%';
                            this.style.height = '100%';
                        } else {
                            this.style.display = originalStyle.display;
                            this.style.width = originalStyle.width;
                            this.style.height = originalStyle.height;
                        }
                    });

                    this.togglePlay = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'NONE') {
                            this.preparePlayer();
                        } 

                        var state = webapis.avplay.getState();
                        var isPlaying = false;
                        if (state === 'IDLE') {
                            webapis.avplay.prepare();
                            webapis.avplay.play();
                            isPlaying = true;
                        } else if (state === 'PLAYING') {
                            webapis.avplay.pause();
                        } else if (state === 'PAUSED') {
                            webapis.avplay.play();
                            isPlaying = true;
                        }
                        
                        if (isPlaying) {
                        	($parse($attrs[$attrs.$normalize('on-play')]) || angular.noop)($scope, {$event: event});
                        } else {
                        	($parse($attrs[$attrs.$normalize('on-pause')]) || angular.noop)($scope, {$event: event});
                        }
                    };
                    
                    this.pause = function() {
                    	webapis.avplay.pause();
                    }

                    this.preparePlayer = function() {
                        var resolutionWidth = $scope.resolutionWidth;

                        var playerCoords = {
                            x: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                            y: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                            width: Math.floor(1920 * resolutionWidth / defaultResolutionWidth),
                            height: Math.floor(1080 * resolutionWidth / defaultResolutionWidth)
                        };

                        webapis.avplay.open($scope.streamSource);
                        webapis.avplay.setDisplayRect(
                            playerCoords.x,
                            playerCoords.y,
                            playerCoords.width,
                            playerCoords.height
                        );
                        webapis.avplay.setListener(listener);
                    };

                    this.requestFullScreen = function() {
                        doFullScreen(function(element) {
                            originalStyle.display = element.style.display;
                            originalStyle.width = element.style.width;
                            originalStyle.height = element.style.height;

                            element[requestFullScreen]();
                        });
                    };

                    this.exitFullScreen = function() {
                        doFullScreen(function() {
                            document[exitFullScreen]();
                        });
                    };

                    this.isFullScreen = function() {
                        return document[isFullScreen];
                    };

                    this.toggleFullScreen = function() {
                        if (this.isFullScreen()) {
                            this.exitFullScreen();
                        } else {
                            this.requestFullScreen();
                        }
                    };
                }
            };
        }],
        caphMediaControls: [function() {
            return {
                restrict: 'E',
                require: '^caphMedia',
                transclude: true,
                link: function($scope, $element, $attrs, controller, $transclude) {
                    $scope.controls = controller;
                    $transclude(function(clone) {
                        $element.append(clone);
                    });
                }
            };
        }]
    });
}]);