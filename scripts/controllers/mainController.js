'use strict';

app.controller('mainController', ['$scope', '$timeout', '$location', 'CONSTANT', function($scope, $timeout, $location, CONSTANT) {

    /* CONSTANT values definition */
    $scope.CATEGORY = CONSTANT.CATEGORY;
    $scope.DEPTH = {
        INDEX: 1,
        PLAYER: 2,
        SETTING: 3
    };

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
    };

    $scope.setting = {
        show: false,
        center: true,
        focusOption: {
            depth: $scope.DEPTH.SETTING
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