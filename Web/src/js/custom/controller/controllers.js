

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('wakeupAlarmController', wakeupAlarmController);

    wakeupAlarmController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService', '$location', '$filter'];

    function wakeupAlarmController($scope, colors, flotOptions, $timeout, localStorageService, $location, $filter) {

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


        if ($location.path() == "/app/wakeup-alarm") {

            $scope.brdCrmRoomNumber = $location.search().room;
            var data = localStorageService.get('wakeupData');

            $scope.wakeuplist = [];
            var tmpDate = new Date();

            tmpDate.setDate(tmpDate.getDate() + 1);

            data.push({
                datetime: tmpDate,
                status: 'Active',
                description: 'Wake Alarm 1',
                room: $location.search().room
            });

            data.push({
                datetime: tmpDate,
                status: 'Active',
                description: 'Wake Alarm 2',
                room: $location.search().room
            });

            data.push({
                datetime: tmpDate,
                status: 'Active',
                description: 'Wake Alarm 3',
                room: $location.search().room
            });



            if (data != null) {

                for (var i = 0; i < data.length; i++) {
                    var room = $location.search().room;


                    if (room) {



                        if (data[i]["room"] == room && new Date(data[i]["datetime"]) > new Date()) {
                            $scope.wakeuplist.push(data[i]);
                        }
                    }


                }
            }

            console.log("list:" + $scope.wakeuplist);

            // function new wakeup alarm
            $scope.newWakup = function () {
                window.location.href = "#/app/set-wakeup-alarm?room=" + $location.search().room + "&id=0";
            };






        }

        if ($location.path() == "/app/set-wakeup-alarm") {



            $scope.brdCrmRoomNumber = $location.search().room;
            $scope.newModel = {
                selectedDate: "",
                time: new Date(),
                status: 'Active',
                description: ''
            };


            if ($location.search().room && $location.search().id) {
                var dataExist = localStorageService.get('wakeupData');

                if (dataExist != null) {

                    for (var i = 0; i < dataExist.length; i++) {
                        var roomEdit = $location.search().room;


                        if (roomEdit) {
                            if (dataExist[i]["room"] == roomEdit && dataExist[i]["id"] == $location.search().id) {
                                $scope.newModel = dataExist[i];
                            }
                        }


                    }
                }
            }





            $scope.submitNew = function (bool) {


                if (bool) {

                    var data = localStorageService.get('wakeupData');

                    if (data == null) {
                        data = [];
                    }


                    var datetime = new Date($scope.newModel.selectedDate);
                    var time = new Date($scope.newModel.time);


                    datetime.setHours(time.getHours());
                    datetime.setMinutes(time.getMinutes());
                    datetime.setSeconds(time.getSeconds());

                    var id = 1;


                    if (data.length > 0) {
                        id = parseInt(data[data.length - 1]["id"]) + 1;
                    }


                    var obj = { id: id, datetime: datetime, status: $scope.newModel.status, description: $scope.newModel.description, room: $location.search().room };
                    data.push(obj);

                    localStorageService.set('wakeupData', data);
                    window.location.href = "#/app/wakeup-alarm?room=" + $location.search().room;
                }



            };


            $scope.cancelNew = function () {
                window.location.href = "#/app/wakeup-alarm?room=" + $location.search().room;
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

            };

            // Time Picker End




        }
    }
})();

(function () {
    'use strict';

    angular
        .module('naut')
        .controller('extensionAttributeController', extensionAttributeController);

    extensionAttributeController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService', '$location'];
    function extensionAttributeController($scope, colors, flotOptions, $timeout, localStorageService, $location) {


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
            aeic: false,
            aeoc: false,
            aiic: false,
            aioc: false,
            room: 0

        };
        $scope.brdCrmRoomNumber = $location.search().room;

        var data = localStorageService.get('exAttr');


        if (data == null) {
            data = [];
        }


        if (data.length > 0) {

            for (var i = 0; i < data.length ; i++) {



                if ($location.search().room == data[i]["room"]) {

                    $scope.model = data[i];
                    break;
                }


            }

        }



        $scope.update = function () {

            var data = localStorageService.get('exAttr');

            if (data == null) {
                data = [];

                $scope.model.room = $location.search().room;


                data.push($scope.model);
                localStorageService.set('exAttr', data);


            } else {


                for (var i = 0; i <= data.length ; i++) {

                    if ($location.search().room == data[i]["room"]) {
                        $scope.model.room = $location.search().room;
                        data[i] = $scope.model;

                        localStorageService.set('exAttr', data);


                        break;
                    }
                }



            }






            window.location.href = "#/app/room-management?room=" + $location.search().room;
        };

        $scope.cancel = function () {
            window.location.href = "#/app/room-management?room=" + $location.search().room;
        };

    }
})();


(function () {
    'use strict';

    angular
        .module('naut')
        .controller('tariffSeaarchController', tariffSeaarchController);
    tariffSeaarchController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService', '$location'];
    function tariffSeaarchController($scope, colors, flotOptions, $timeout, localStorageService, $location) {

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
            country: '',
            code: '',
            rate: '0.00'
        };

        var currency = "";




        $scope.brdCrmRoomNumber = $location.search().room;



        if (localStorageService.get('settings') != null) {
            var settings = localStorageService.get('settings');

            currency = settings.currency == "GBP" ? '£' :
                settings.currency == "EUR" ? '€' :
                settings.currency == "USD" ? '$' : "£";

        }


        $scope.countries = [
            { code: '0093', country: 'Afghanistan', rate: currency + '0.08' },
            { code: '0092', country: 'Pakistan', rate: currency + '0.10' },


            { code: '0092', country: 'Pakistan', rate: currency + '0.10' },
            { code: '0092300', country: 'Pakistan', rate: currency + '0.10' },
            { code: '0092301', country: 'Pakistan', rate: currency + '0.05' },
            { code: '0092302', country: 'Pakistan', rate: currency + '0.5' },
            { code: '0092303', country: 'Pakistan', rate: currency + '0.8' },
            { code: '0092313', country: 'Pakistan', rate: currency + '0.2' },
            { code: '0092313', country: 'Pakistan', rate: currency + '0.9' },
            { code: '0092333', country: 'Pakistan', rate: currency + '1.25' },
            { code: '0092334', country: 'Pakistan', rate: currency + '0.01' },
            { code: '0092345', country: 'Pakistan', rate: currency + '1.11' },
            { code: '0091', country: 'India', rate: currency + '1.08' },
            { code: '00966', country: 'Saudi Arabia', rate: currency + '0.18' },
            { code: '0044', country: 'United Kingdom', rate: currency + '2.08' },
            { code: '00971', country: 'United Arab Emirates', rate: currency + '0.02' }


        ];


        $scope.search = function () {




            $("#tblTarrifSearch tbody > tr").each(function () {
                var code = $(this).children("td:eq(0)").children("span").html();
                var countryName = $(this).children("td:eq(1)").children("span").html();

                if ($scope.model.country.trim().length == 0 && $scope.model.code.trim().length == 0) {
                    $(this).show();
                } else {
                    if ((code.indexOf($scope.model.code.trim()) == 0 && $scope.model.code.trim().length > 0)
                        || (countryName.toUpperCase().indexOf($scope.model.country.toUpperCase().trim()) == 0 && $scope.model.country.trim().length > 0)) {
                        $(this).show();
                    } else {
                        $(this).hide();
                    }
                }
            });





        };


    }
})();






(function () {
    'use strict';

    angular
        .module('naut')
        .controller('settingsController', settingsController);

    settingsController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService'];
    function settingsController($scope, colors, flotOptions, $timeout, localStorageService) {

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


        $scope.model = { hotelName: "", hotelAddress: "", currency: 'GBP' };



        if (localStorageService.get('settings') != null) {
            $scope.model = localStorageService.get('settings');
        }


        $scope.roomsList = [
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



        $scope.search = function () {
            var list = [
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



            if ($scope.model.room != "") {
                $scope.roomsList = [];
                for (var i = 0; i < list.length; i++) {
                    if (list[i]["room"] == $scope.model.room.trim()) {
                        $scope.roomsList.push(list[i]);
                    }
                }
            } else {
                $scope.roomsList = list;
            }
        };




        $scope.cancel = function () {

            window.location.href = "#/app/dashboard";

        };

        $scope.submitForm = function () {

            localStorageService.set('settings', $scope.model);

            window.location.href = "#/app/dashboard";
        };

    }
})();



(function () {
    'use strict';

    angular
        .module('naut')
        .controller('roomManagementController', roomManagementController);

    roomManagementController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService'];
    function roomManagementController($scope, colors, flotOptions, $timeout, localStorageService) {

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


        $scope.model = { room: "", name: "" };


        $scope.roomsList = [];


        if (localStorageService.get('checkin') != null) {
            $scope.roomsList = localStorageService.get('checkin');

        }





        $scope.search = function () {





            var list = localStorageService.get('checkin');

            if (list == null) {
                list = [];
            }


            if ($scope.model.room != "" || $scope.model.name != "") {
                $scope.roomsList = [];
                for (var i = 0; i < list.length; i++) {


                    if (list[i]["room"]["room"].toString() == $scope.model.room.trim()

                        || (list[i]["name"].indexOf($scope.model.name.trim()) == 0 && $scope.model.name.trim().length > 0)

                        ) {
                        $scope.roomsList.push(list[i]);
                    }


                }
            } else {
                $scope.roomsList = list;


            }


        };








    }
})();




(function () {
    'use strict';

    angular
        .module('naut')
        .controller('memberController', memberController);

    memberController.$inject = ['$scope', 'colors', 'flotOptions', '$timeout', 'localStorageService'];
    function memberController($scope, colors, flotOptions, $timeout, localStorageService) {

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



        $scope.members = [

             {
                 no: "1",
                 name: "A.Nabi",
                 memberNO: "0001",
                 oMember: "-",
                 wMember: "-",
                 charity: 0,
                 memberCon: "0",
                 totalPayment: "0",
                 returnOn: "0",
                 color: 'label-primary'

             },
             {
                 no: "2",
                 name: "Fatima A.Nabi",
                 memberNO: "0002",
                 oMember: "-",
                 wMember: "-",
                 charity: 0,
                 memberCon: "0",
                 totalPayment: "0",
                 returnOn: "0",
                 color: 'label-pink'

             },
             {
                 no: "3",
                 name: "Zainab A.Nabi",
                 memberNO: "0003",
                 oMember: "-",
                 wMember: "-",
                 charity: 0,
                 memberCon: "0",
                 totalPayment: "0",
                 returnOn: "0"
                 ,
                 color: 'label-orange'

             },
             {
                 no: "4",
                 name: "Muhammad Ali",
                 memberNO: "0004",
                 oMember: "-",
                 wMember: "-",
                 charity: 0,
                 memberCon: "0",
                 totalPayment: "0",
                 returnOn: "0"
                 ,
                 color: 'label-warning'

             },



             // new row user 0001 sale 4 coupan

                 {
                     no: "5",
                     name: "Farrukh",
                     memberNO: "0005",
                     oMember: "0001",
                     wMember: "0001",
                     charity: '10',
                     memberCon: "10",
                     totalPayment: "20",
                     returnOn: "10",
                     color: 'label-primary'
                 },
             {
                 no: "6",
                 name: "Ahmed Ali",
                 memberNO: "0006",
                 oMember: "0001",
                 wMember: "0001",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-primary'

             },
             {
                 no: "7",
                 name: "Imran Jutt",
                 memberNO: "0007",
                 oMember: "0001",
                 wMember: "0001",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-primary'

             },
             {
                 no: "8",
                 name: "Abrar Hussain",
                 memberNO: "0008",
                 oMember: "0001",
                 wMember: "0001",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-primary'

             },



             // new row user 0002 sale 4 coupan

                 {
                     no: "9",
                     name: "Ibrahim Khan",
                     memberNO: "0009",
                     oMember: "0002",
                     wMember: "0002",
                     charity: '10',
                     memberCon: "10",
                     totalPayment: "20",
                     returnOn: "10",
                     color: 'label-pink'
                 },
             {
                 no: "10",
                 name: "John Smith",
                 memberNO: "0010",
                 oMember: "0002",
                 wMember: "0002",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-pink'

             },
             {
                 no: "11",
                 name: "Safina Naz",
                 memberNO: "0011",
                 oMember: "0002",
                 wMember: "0002",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-pink'

             },
             {
                 no: "12",
                 name: "Ali Akber",
                 memberNO: "0008",
                 oMember: "0001",
                 wMember: "0001",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-pink'

             },


             // new row user 0003 sale 4 coupan

                 {
                     no: "13",
                     name: "Ibrahim Khan",
                     memberNO: "0013",
                     oMember: "0003",
                     wMember: "0003",
                     charity: '10',
                     memberCon: "10",
                     totalPayment: "20",
                     returnOn: "10",
                     color: 'label-orange'
                 },
             {
                 no: "14",
                 name: "John Smith",
                 memberNO: "0014",
                 oMember: "0003",
                 wMember: "0003",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-orange'

             },
             {
                 no: "15",
                 name: "Safina Naz",
                 memberNO: "0015",
                 oMember: "0003",
                 wMember: "0003",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-orange'

             },
             {
                 no: "16",
                 name: "Ali Akber",
                 memberNO: "0016",
                 oMember: "0003",
                 wMember: "0003",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-orange'

             },


             // new row user 0004 sale 4 coupan

                 {
                     no: "17",
                     name: "Ibrahim Khan",
                     memberNO: "0017",
                     oMember: "0004",
                     wMember: "0004",
                     charity: '10',
                     memberCon: "10",
                     totalPayment: "20",
                     returnOn: "10",
                     color: 'label-warning'
                 },
             {
                 no: "18",
                 name: "John Smith",
                 memberNO: "0018",
                 oMember: "0004",
                 wMember: "0004",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-warning'

             },
             {
                 no: "19",
                 name: "Safina Naz",
                 memberNO: "0019",
                 oMember: "0004",
                 wMember: "0004",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-warning'

             },
             {
                 no: "20",
                 name: "Ali Akber",
                 memberNO: "0020",
                 oMember: "0003",
                 wMember: "0003",
                 charity: '10',
                 memberCon: "10",
                 totalPayment: "20",
                 returnOn: "10",
                 color: 'label-warning'

             },



        ];


        $scope.uMembers = [

           {
               no: "1",
               name: "Farrukh KHan",
               memberNO: "0021",
               oMember: "0020",
               wMember: "0020",
               charity: 10,
               memberCon: "10",
               totalPayment: "20",
               returnOn: "10",
               color: 'label-primary'

           },




           // new row user 0001 sale 4 coupan

               {
                   no: "5",
                   name: "Farrukh",
                   memberNO: "0005",
                   oMember: "0001",
                   wMember: "0001",
                   charity: '10',
                   memberCon: "10",
                   totalPayment: "20",
                   returnOn: "10",
                   color: 'label-primary'
               },
           {
               no: "6",
               name: "Ahmed Ali",
               memberNO: "0006",
               oMember: "0001",
               wMember: "0001",
               charity: '10',
               memberCon: "10",
               totalPayment: "20",
               returnOn: "10",
               color: 'label-primary'

           },
           {
               no: "7",
               name: "Imran Jutt",
               memberNO: "0007",
               oMember: "0001",
               wMember: "0001",
               charity: '10',
               memberCon: "10",
               totalPayment: "20",
               returnOn: "10",
               color: 'label-primary'

           },
           {
               no: "8",
               name: "Abrar Hussain",
               memberNO: "0008",
               oMember: "0001",
               wMember: "0001",
               charity: '10',
               memberCon: "10",
               totalPayment: "20",
               returnOn: "10",
               color: 'label-primary'

           },





        ];


    }
})();
