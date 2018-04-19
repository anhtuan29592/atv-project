'use strict';

app.controller('loadingController', ['$scope', '$timeout', '$location', 'CONSTANT', function($scope, $timeout, $location, CONSTANT) {

    /* CONSTANT values definition */
    $scope.CATEGORY = CONSTANT.CATEGORY;
//    $scope.DEPTH = {
//        INDEX: 1,
//        PLAYER: 2,
//        SETTING: 3
//    };
    
    var items = CONSTANT.ITEMS;
    $scope.dataCategory = [items, items, items, items];

    $scope.$on('$viewContentLoaded', function() {
        updateCategoryListData(CONSTANT.PREPARED_DATA.GENERAL, $scope.CATEGORY.GENERAL, true);
        tizen.systeminfo.getPropertyValue('DISPLAY',
            function(display) {
                $scope.resolutionWidth = 1920;
            });
        $timeout(function() {
            $location.path("home");
        }, 3000);
    });

    // Update and reload data for each list component.
    function updateCategoryListData(response, category, reload) {
        $scope.dataCategory[category] = response;
        $timeout(function() {
            reload && $('#list-' + category).trigger('reload');
        }, 0);
    };

    $scope.setting = {
        show: false,
        center: true,
        focusOption: {
            depth: 3
        },
        onSelectButton: function(buttonIndex, $event) {
            $scope.setting.show = false;
        },
        setSubTitle: function($event, $checked) {
            $scope.setting.subTitle = $checked;
        },
        setAutoPlay: function($event, $checked) {
            $scope.setting.autoPlay = $checked;
        },
        subTitle: false,
        autoPlay: true
    };
}]);