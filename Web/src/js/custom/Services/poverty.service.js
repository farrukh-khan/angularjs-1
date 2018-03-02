'use strict';
angular.module('naut').factory('povertyService', ['$http', '$q', 'localStorageService', 'ngAuthSettings',
    function ($http, $q, localStorageService, ngAuthSettings) {

        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var povertyServiceServiceFactory = {};

        var _getDashboard = function (iCustomer) {

            return $http.get(serviceBase + 'api/Dashboard/GetDashboard').then(function (response) {
                return response;
            });
        };


        var _getMembers = function () {

            return $http.get(serviceBase + 'api/Dashboard/GetMembers').then(function (response) {
                return response;
            });
        };



        povertyServiceServiceFactory.getMembers = _getMembers;
        povertyServiceServiceFactory.getDashboard = _getDashboard;



        return povertyServiceServiceFactory;
    }]);