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

                    this.play = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'IDLE') {
                            webapis.avplay.prepare();
                            webapis.avplay.play();
                        } else if (state === 'PAUSED') {
                            webapis.avplay.play();
                        }

                        ($parse($attrs[$attrs.$normalize('on-play')]) || angular.noop)($scope, {
                            $event: event
                        });
                    };

                    this.pause = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'PLAYING') {
                            webapis.avplay.pause();
                            ($parse($attrs[$attrs.$normalize('on-pause')]) || angular.noop)($scope, {
                                $event: event
                            });
                        }
                    }

                    this.tooglePlay = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'IDLE' || state === 'PAUSED') {
                            this.play();
                        } else if (state === 'PLAYING') {
                            this.pause();
                        }
                    };

                    this.preparePlayer = function(configs) {
                        var resolutionWidth = configs.resolutionWidth;

                        var playerCoords = {
                            x: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                            y: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                            width: Math.floor(1920 * resolutionWidth / defaultResolutionWidth),
                            height: Math.floor(1080 * resolutionWidth / defaultResolutionWidth)
                        };

                        webapis.avplay.open(configs.url);
                        webapis.avplay.setDisplayRect(
                            playerCoords.x,
                            playerCoords.y,
                            playerCoords.width,
                            playerCoords.height
                        );
                        webapis.avplay.setListener(listener);
                    };

                    this.close = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'IDLE') {
                            webapis.avplay.close();
                        }
                    }

                    this.stop = function() {
                        var state = webapis.avplay.getState();
                        if (state === 'PLAYING') {
                            webapis.avplay.stop();
                        }
                    }

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
                scope: {
                    control: '='
                },
                link: function($scope, $element, $attrs, controller, $transclude) {
                    $scope.control.preparePlayer = function(configs) {
                    	controller.preparePlayer(configs);
                    };

                    $scope.control.play = function() {
                        controller.play();
                    };

                    $scope.control.pause = function() {
                        controller.pause();
                    };

                    $scope.control.tooglePlay = function() {
                        controller.tooglePlay();
                    };

                    $scope.control.close = function() {
                        controller.close();
                    };

                    $scope.control.stop = function() {
                        controller.stop();
                    };

                    $scope.control.requestFullScreen = function() {
                        controller.requestFullScreen();
                    };

                    $scope.control.exitFullScreen = function() {
                        controller.exitFullScreen();
                    };

                    $scope.control.isFullScreen = function() {
                        return controller.isFullScreen();
                    };

                    $scope.control.toggleFullScreen = function() {
                        controller.toggleFullScreen();
                    };

                    $transclude(function(clone) {
                        $element.append(clone);
                    });
                }
            };
        }]
    });
}]);