'use strict';

app
    .factory(
        'videoPlayer', ['$scope', function($scope) {
            var log = function(msg) {
                console.log(msg);
            }

            var defaultResolutionWidth = 1920;
            var resolutionWidth = $scope.resolutionWidth;

            var playerCoords = {
                x: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                y: Math.floor(0 * resolutionWidth / defaultResolutionWidth),
                width: Math.floor(1920 * resolutionWidth / defaultResolutionWidth),
                height: Math.floor(1080 * resolutionWidth / defaultResolutionWidth)
            };

            /**
             * 4k flag
             * @type {Boolean}
             */
            var isUhd = false;

            return {
                /**
                 * Function to initialize the playback.
                 * @param {String} url - content url, if there is no value then take url from config
                 */
                open: function(url) {
                    /* Create listener object. */
                    var listener = {
                        onbufferingstart: function() {
                            log("Buffering start.");
                        },
                        onbufferingprogress: function(percent) {
                            log("Buffering progress data : " + percent);
                        },
                        onbufferingcomplete: function() {
                            log("Buffering complete.");
                        },
                        oncurrentplaytime: function(currentTime) {
                            log("Current playtime: " + currentTime);
                        },
                        onevent: function(eventType, eventData) {
                            log("event type: " + eventType + ", data: " + eventData);
                        },
                        onstreamcompleted: function() {
                            log("Stream Completed");
                            this.stop();
                        }.bind(this),
                        onerror: function(eventType) {
                            log("event type error : " + eventType);
                        }
                    };
                    log('videoPlayer open: ' + url);
                    try {
                        webapis.avplay.open(url);
                        webapis.avplay.setDisplayRect(
                            playerCoords.x,
                            playerCoords.y,
                            playerCoords.width,
                            playerCoords.height
                        );
                        webapis.avplay.setListener(listener);
                    } catch (e) {
                        log(e);
                    }
                },

                play: function() {
                    //set 4k
                    if (isUhd) {
                        this.set4K();
                    }

                    if (webapis.avplay.getState() === 'IDLE') {
                        webapis.avplay.prepare();
                        webapis.avplay.play();
                    } else if (webapis.avplay.getState() === 'PAUSED') {
                        webapis.avplay.play();
                    }
                },

                /**
                 * Function to stop current playback.
                 */
                stop: function() {
                    webapis.avplay.stop();
                },
                /**
                 * Function to pause/resume playback.
                 * @param {String} url - content url, if there is no value then take url from config
                 */
                pause: function(url) {
                    webapis.avplay.pause();
                },
                /**
                 * Jump forward 3 seconds (3000 ms).
                 */
                ff: function() {
                    webapis.avplay.jumpForward('3000');
                },
                /**
                 * Rewind 3 seconds (3000 ms).
                 */
                rew: function() {
                    webapis.avplay.jumpBackward('3000');
                },
                /**
                 * Set flag to play UHD content.
                 * @param {Boolean} isEnabled - Flag to set UHD.
                 */
                setUhd: function(isEnabled) {
                    isUhd = isEnabled;
                },
                /**
                 * Set to TV to play UHD content.
                 */
                set4K: function() {
                    webapis.avplay.setStreamingProperty("SET_MODE_4K", "true");
                }
            };
        }]);