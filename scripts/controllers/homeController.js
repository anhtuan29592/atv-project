'use strict';

app.controller('homeController', ['$scope', '$timeout', '$document', '$location', 'FocusUtil', 'FocusConstant', 'focusController', 'CONSTANT', function($scope, $timeout, $document, $location, FocusUtil, FocusConstant, focusController, CONSTANT) {

    /* Initial values are defined. */
    $scope.currentCategory = $scope.CATEGORY.GENERAL;
    $scope.isOverviewDark = true;

    $scope.$on('$viewContentLoaded', function() {
        $timeout(function() { // Set 'focus' to specific element by 'focus' controller.
            focusController.focus($('#' + $scope.CATEGORY.GENERAL + '-' + CONSTANT.PREPARED_DATA.GENERAL[0].id));
        }, CONSTANT.EFFECT_DELAY_TIME);
    });

    var lastFocusedGroup;

    var isScrolling = false;
    $scope.onScrollStart = function() {
        isScrolling = true;
    };
    $scope.onScrollFinish = function() {
        isScrolling = false;
        updateOverview();
    };

    $scope.toggleIsPlaying = function(isPlaying) { // Change button shape by '$scope.isPlaying' ('Play' <-> 'Pause')
        $scope.$applyAsync(function() {
            $scope.isPlaying = isPlaying;
        });
    };

    // The callback function which is called when each list component get the 'focus'.
    $scope.focus = function($event, category, data, $index) {
        var scrollCount = category;
        moveContainer(category, 'list-category', -CONSTANT.SCROLL_HEIGHT_OF_INDEX * scrollCount);
        if (!data || !data.item || data.item.loaded === false) {
            return;
        }
        $scope.currentItemData = data.item;
        isScrolling === false && updateOverview();
        lastFocusedGroup = FocusUtil.getData($event.currentTarget).group;
    };

    // The callback function which is called when each list component lose the 'focus'.
    $scope.blur = function($event, category, data) {
        $scope.isOverviewDark = true;
    };

    // The callback function which is called when user select one item of the list component.
    $scope.selected = function($event, category, item, $index) {
        if (item.loaded === false) {
            return;
        }
        $location.path("player");
    };

    $scope.buttonFocusInDetail = function($event, $originalEvent) {
        $scope.isOverviewDark = false;
    };

    function updateOverview() {
        $scope.overview = $scope.currentItemData;
        $scope.isOverviewDark = false;
    }

    var moveContainer = function(category, regionId, targetTop) {
        if (category === $scope.currentCategory) {
            return;
        }
        $('#' + regionId).css({
            transform: 'translate3d(0, ' + targetTop + 'px, 0)'
        });
        $scope.currentCategory = category;
    };

    $scope.back = function() {
        // exit in this page
    };
}]);