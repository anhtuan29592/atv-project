'use strict';

app
    .factory(
        'CONSTANT',
        function() {
            var ITEM = {
                loaded: false
            };

            return {
                ITEM: ITEM,
                ITEMS: [ITEM, ITEM, ITEM, ITEM],
                CATEGORY: {
                	GENERAL: 0,
                	LIVE_SPORT: 1,
                	VTV: 2,
                	VTC: 3,
                	HTV: 4,
                	SCTV: 5,
                	LOCAL: 6,
                	FOREIGN: 7
                },
                EFFECT_DELAY_TIME: 500,
                SCROLL_HEIGHT_OF_INDEX: 297, // 269, //369, 265+28
                MEDIA_CONTROLLER_TIMEOUT: 3500,
                KEY_CODE: {
                    RETURN: 10009,
                    ESC: 27
                },
                /*
                 * CLASS_NAMES: { BTN: '.btn', BTN_PLAY: '.btn-play',
                 * BTN_RESUME: '.btn-resume', BTN_RESTART:
                 * '.btn-restart', BTN_ADD_MY_TALKS: '.btn-add-talks',
                 * BTN_REMOVE_MY_TALKS: '.btn-remove-talks',
                 * BTN_PLAYER_MY_TALKS: '.player_talks',
                 * BTN_PLAYER_MY_TALKS_ACTIVE: '.player_talks_active',
                 * BTN_ABOUT_SPEAKER: '.btn-about-speaker',
                 * BTN_ABOUT_TALK: '.btn-about-talk', VIDEO_INFORMATION:
                 * '.video-information', CONTROLS_BAR: '.controls-bar',
                 * SUBTITLE_BOTTOM: 'subtitle-bottom', SUBTITLE_MID:
                 * 'subtitle-mid', SUBTITLE: '#subtitle' },
                 */
                PREPARED_DATA: {
                    GENERAL: [{
                        description: 'Th&#7901;i s&#7921; ch&iacute;nh tr&#7883;',
                        id: 'vtv1',
                        name: 'VTV1',
                        photo_urls: [{
                            size: '268x268',
                            url: 'images/chanels/vtv1.jpg'
                        }],
                        color: 'rgba(255, 255, 255, .3)',
                        source: 'http://27.67.50.6:18080/71.m3u8?AdaptiveType=HLS&VOD_RequestID=U6tIRX+QtmFBXhLTgqa7ueyBtmHx5QAI3mRpdZ2Q7ux7K53vZQMpmfIQhMqTkuSfwmjwlKwMPbiALKNBVRv5yw=='
                    }, {
                        description: 'Khoa h&#7885;c gi&aacute;o d&#7909;c',
                        id: 'vtv2',
                        name: 'VTV2',
                        photo_urls: [{
                            size: '268x268',
                            url: 'images/chanels/vtv2.jpg'
                        }],
                        color: 'rgba(255, 255, 255, .3)',
                        source: 'http://27.67.50.6:18080/71.m3u8?AdaptiveType=HLS&VOD_RequestID=U6tIRX+QtmFBXhLTgqa7ueyBtmHx5QAI3mRpdZ2Q7ux7K53vZQMpmfIQhMqTkuSfpz36Fe79xublCbnsklQtqg=='
                    }, {
                        description: 'Th&#7875; thao gi&#7843;i tr&iacute;',
                        id: 'vtv3',
                        name: 'VTV3',
                        photo_urls: [{
                            size: '268x268',
                            url: 'images/chanels/vtv3.jpg'
                        }],
                        color: 'rgba(255, 255, 255, .3)',
                        source: 'http://27.67.50.6:18080/71.m3u8?AdaptiveType=HLS&VOD_RequestID=U6tIRX+QtmFBXhLTgqa7ueyBtmHx5QAI3mRpdZ2Q7ux7K53vZQMpmfIQhMqTkuSfpz36Fe79xublCbnsklQtqg=='
                    }]
                }
            };
        });