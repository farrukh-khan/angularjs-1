/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$rootScope', '$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService'];

    function DashboardController($rootScope, $scope, colors, flotOptions, $timeout, localStorageService) {

        // Some numbers for demo
        $scope.loadProgressValues = function () {
            $scope.progressVal = [0, 0, 0, 0];
            // helps to show animation when values change
            $timeout(function () {
                $scope.progressVal[0] = 60;
                $scope.progressVal[1] = 34;
                $scope.progressVal[2] = 22;
                $scope.progressVal[3] = 76;
            });
        };

        $scope.chartBarStackedFlotChart = flotOptions['bar-stacked'];
        $scope.chartBarFlotChart = flotOptions['bar'];
        $scope.piePercent1 = 52;
        $scope.piePercent2 = 50;
        $scope.piePercent3 = 50;

        $scope.pieOptions = {
            animate: {
                duration: 700,
                enabled: true
            },
            barColor: colors.byName('info'),
            // trackColor: colors.byName('inverse'),
            scaleColor: false,
            lineWidth: 10,
            lineCap: 'circle'
        };



        //console.log('test');
        //var loggedUser = localStorageService.get('authData');

        //if (loggedUser)
        //{
        //    console.log(loggedUser.roleName);
        //    if(loggedUser.roleName != 'Admin')
        //    {
        //        $rootScope.app.layout.isBoxed = true;
        //        console.log($rootScope.app.layout.isBoxed);
        //    }

        //}


        //console.log($rootScope.app.theme.sidebar);







        // Dashboard charts
        // ----------------------------------- 

        // Spline chart
        $scope.splineChartOpts = angular.extend({}, flotOptions['default'], {
            series: {
                lines: {
                    show: false
                },
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 2,
                    fill: 0.5
                },
            },
            yaxis: { max: 50 }
        });
        $scope.splineData = getSplineData();

        function getSplineData() {
            return [{
                'label': 'Capital',
                'color': colors.byName($scope.app.theme.name),
                'data':

                //    [
                //  ['Jan', 28], ['Feb', 30], ['3', 32], ['4', 33], ['5', 33], ['6', 32], ['7', 31],
                //  ['8', 30], ['9', 29], ['10', 28], ['11', 28], ['12', 29], ['13', 30], ['14', 29], ['15', 28]
                //]

               [
    ["Jan", 121203234],
    ["Feb", 121203234],
    ["Mar", 111203234]

    //,
    //["Apr", 121503234],
    //["May", 521203234],
    //["Jun", 521203234],
    //["Jul", 221203234],
    //["Aug", 721203234],
    //["Sep", 121203234],
    //["Oct", 821203234],
    //["Nov", 111203234],
    //["Dec", 121203235]
               ]




            }

            //, {
            //    'label': 'ROE',
            //    'color': colors.byName($scope.app.theme.name),
            //    'data': [
            //      ['1', 12], ['2', 14], ['3', 20], ['4', 16], ['5', 18], ['6', 14], ['7', 19], ['8', 24], ['9', 18], ['10', 14], ['11', 16], ['12', 15], ['13', 14], ['14', 16], ['15', 18]
            //    ]
            //}


            ];
        }

        $scope.$watch('app.theme.name', function (val) {
            $scope.splineData = getSplineData();
        });


    }
})();
