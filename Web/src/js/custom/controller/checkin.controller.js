/**=========================================================
 * Module: DashboardController.js
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('CheckInController', CheckInController);

    CheckInController.$inject = [
        '$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService', '$filter'
    ];

    function CheckInController($scope, colors, flotOptions, $timeout, localStorageService, $filter) {

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



        $scope.model = {
            name: "",
            title: "Mr",
            email: "",
            initials: "",
            address: "",
            datetime: $filter('date')(new Date(), 'dd-MM-yyyy').toString(),
            time: new Date(),
            aeic: false,
            aeoc: false,
            aiic: false,
            aioc: false

        };

        $scope.rooms = [
            { room: 1 },
            { room: 2 },
            { room: 3 },
            { room: 4 },
            { room: 5 },
            { room: 6 },
            { room: 7 },
            { room: 8 },
            { room: 9 },
            { room: 10 }
        ];




        var roomsStorage = localStorageService.get('checkin');

        if (roomsStorage != null) {


            for (var i = 1; i <= 10; i++) {


                var bool = index_of(roomsStorage, i);

                if (bool) {
                    $scope.rooms.push({ room: i });
                }

            }
        }

        $scope.submitCheckIn = function (bool) {


            var data = localStorageService.get('checkin');;
            if (data == null) {
                data = [];
            }

            data.push($scope.model);

            localStorageService.set('checkin', data);

            window.location.href = "#/app/dashboard";
        };

        $scope.submitCheckOut = function (bool) {
            window.location.href = "#/app/dashboard";
        };


        $scope.cancel = function () {
            window.location.href = "#/app/dashboard";
        };


        // Time Picker start
        $scope.hstep = 1;
        $scope.mstep = 15;
        $scope.options = {
            hstep: [1, 2, 3],
            mstep: [1, 5, 10, 15, 25, 30]
        };
        $scope.ismeridian = true;
        $scope.toggleMode = function () {
            $scope.ismeridian = !$scope.ismeridian;
        };
        $scope.changed = function () {
            //console.log('Time changed to: ' + $scope.model.timeRangeStartTime);
            //console.log('Time changed to: ' + $scope.model.timeRangeEndTime);
        };
        // Time Picker Endr End

        $scope.steps = function (number) {
            $scope.activeStep = number;
        };



    }
})();
function index_of(roomsStorage, i) {



    for (var j = 0; j < roomsStorage.length; j++) {
        if (roomsStorage[j]["room"]["room"] == i) {
            return false;
        }

    }

    return true;

}





(function () {
    'use strict';

    angular
        .module('naut')
        .controller('CheckOutController', CheckOutController);

    CheckOutController.$inject = [
        '$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService', 'modalService'
    ];

    function CheckOutController($scope, colors, flotOptions, $timeout, localStorageService, modalService) {

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

        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var currency = '';
        var hotelName = "";



        if (localStorageService.get('settings') != null) {
            var settings = localStorageService.get('settings');
            currency = settings.currency == "GBP" ? '£' :
                settings.currency == "EUR" ? '€' :
                settings.currency == "USD" ? '$' : "£";
            hotelName = settings.hotelName;

        }




        $scope.callsList = [];
        $scope.callsList.push({ number: '44955645446', description: 'UK Landline', startTime: '09-09-2015 14:00', endTime: '09-09-2015 15:00', duration: '00:05:00', cost: '10' });
        $scope.callsList.push({ number: '44955645445', description: 'UK Mobile', startTime: '18-09-2015 12:00', endTime: '18-09-2015 13:00', duration: '01:10:00', cost: '50' });


        $scope.model = {
            name: "",
            selectedRoom: -1,
            hotelName: hotelName,
            invoiceNumber: '4436',
            monthName: monthNames[new Date().getMonth()],
            date: new Date(),
            subTotal: '60.00',
            currency: currency,
            tax: '06.00',
            total: '66.00',
            customerName: 'Aamir Saeed',
            checkInDatetime: new Date(),
            checkOutDatetime: new Date()

        };


        var checkinList = localStorageService.get('checkin');
        if (checkinList == null) {
            $scope.roomsList = [];
        } else {
            $scope.roomsList = checkinList;
        }


        $scope.totalDuration = '01:15:00';
        $scope.totalCost = 60;


        $scope.sendInvoice = function () {

            var modalOptions = {
                actionButtonText: 'Send',
                headerText: 'Email',
                bodyText: $scope.email
                
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                window.location.href = "#/app/dashboard";
            });

        }


        $scope.submitCheckOut = function (bool) {

            
            var data = [];
            var list = localStorageService.get('checkin');

            if (list != null) {
                for (var i = 0; i < list.length; i++) {

                    if (list[i]["room"]["room"] != $scope.model.selectedRoom) {
                        data.push(list[i]);
                    }
                }
                localStorageService.set('checkin', data);
            }


            //window.location.href = "#/app/dashboard";
        };

        $scope.search = function () {


            var list = localStorageService.get('checkin');
            if (list != null) {
                if ($scope.model.room != "" || $scope.model.name != "") {


                    $scope.roomsList = [];
                    for (var i = 0; i < list.length; i++) {


                        if (list[i]["room"]["room"] == $scope.model.room.trim()
                            || (list[i]["name"].indexOf($scope.model.name.trim()) == 0 && $scope.model.name.trim().length > 0)) {

                            $scope.roomsList.push(list[i]);
                        }


                    }

                } else {
                    $scope.roomsList = list;
                }


            }


        };


        $scope.cancel = function () {
            window.location.href = "#/app/dashboard";
        };

        $scope.select = function (room) {

            $scope.activeStep = 2;

            $scope.model.selectedRoom = room;

            
            var existList = localStorageService.get('checkin');

            if (existList != null) {
                for (var i = 0; i < existList.length; i++) {


                    console.log(existList[i]["room"]["room"]);

                    if (existList[i]["room"]["room"] == $scope.model.selectedRoom) {
                        $scope.model.customerName = existList[i].name;
                        $scope.model.checkInDatetime = existList[i].datetime;
                        $scope.email = existList[i].email;


                    }
                }

            }

            



        };




        $scope.steps = function (number) {


            $scope.activeStep = number;

        };





    }
})();



