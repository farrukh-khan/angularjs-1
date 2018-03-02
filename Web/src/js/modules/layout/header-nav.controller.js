/**=========================================================
 * Module: HeaderNavController
 * Controls the header navigation
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('HeaderNavController', HeaderNavController);
    /* @ngInject */
    function HeaderNavController($scope, $rootScope, localStorageService) {

        $scope.headerMenuCollapsed = true;

        $scope.model = { hotelName: "" };
        $scope.authData = { loggedInUser: "" };

        $scope.toggleHeaderMenu = function () {
            $scope.headerMenuCollapsed = !$scope.headerMenuCollapsed;
        };

        var loggedUser = localStorageService.get('authData');
        $scope.authData.loggedInUser = loggedUser.firstName + " " + loggedUser.lastName;
        $scope.model = localStorageService.get('settings');


        $scope.logout = function () {
            localStorageService.set('authData', null);
            window.location.href = "#/login";
        };


        // Adjustment on route changes
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            $scope.headerMenuCollapsed = true;
        });

    }

})();
