'use strict';
angular.module('naut').controller('loginController', ['$scope', '$location', 'localStorageService',


    function ($scope, $location, localStorageService) {

        $scope.loginData = {
            userName: "",
            password: "",
            rememberMe: false,
            useRefreshTokens: false,
            isLogOffUser: false,
            message: ""
        };

        //localStorageService.set('users',null);

        //var settings = { hotelName: "hotel Code Desk", hotelAddress: "Lahore" };
        localStorageService.set('settings', null);
        

        var usersList = localStorageService.get('users');
        

        //var userNotExist = true;
        //if (usersList != null) {
        //for (var i = 0; i < usersList.length; i++) {
        //    if ("farrukh@itapx.com" == usersList[i]["email"] && "123456" == usersList[i]["password"] || "admin@itapx.com" == usersList[i]["email"] && "123456" == usersList[i]["password"]) {
        //        userNotExist = false;
        //        break;
        //    }
            
        //}}

        //usersList = null;
        //if (userNotExist && usersList == null) {

            usersList = [];
            var tempUser = {
                id: "1",
                firstName: "Farrukh",
                lastName: "Khan",
                roleName: "Admin",
                roleId: "1",
                isActive: true,
                email: "farrukh@itapx.com",
                password: "123456",
                confirmPassword: "123456",
                iCustomer: null,
                clientId: null,
                fkUser: 0,
                inviedPerson: 'Pverty Bank',
                aCoupon: '2',
                sCoupon:'2',
                pShare: '10BD',
                earn: '10BD'

            };

            usersList.push(tempUser);

            var imranUser = {
                id: "2",
                firstName: "Farrukh",
                lastName: "Khan",
                roleName: "User",
                roleId: "1",
                isActive: true,
                email: "admin@pphisindh.org",
                password: "123456",
                confirmPassword: "123456",
                iCustomer: null,
                clientId: null,
                fkUser: 0,
                inviedPerson: 'Farrukh Khan',
                aCoupon: '2',
                sCoupon: '2',
                pShare: '10BD',
                earn: '10BD'

            };


            usersList.push(imranUser);


            var shahUser = {
                id: "3",
                firstName: "Shahrukh",
                lastName: "Khan",
                roleName: "User",
                roleId: "1",
                isActive: true,
                email: "shahrukh@itapx.com",
                password: "123456",
                confirmPassword: "123456",
                iCustomer: null,
                clientId: null,
                fkUser: 0,
                inviedPerson: 'Farrukh Khan',
                aCoupon: '2',
                sCoupon: '2',
                pShare: '10BD',
                earn: '10BD'

            };


            usersList.push(shahUser);




            localStorageService.set('users', usersList);

        //}



        $scope.login = function () {



            var users = localStorageService.get('users');

            var bool = false;
            var user = null;
            for (var i = 0; i < users.length; i++) {



                if ($scope.loginData.userName == users[i]["email"] && $scope.loginData.password == users[i]["password"]) {
                    bool = true;
                    user = users[i];
                    break;
                }

            }





            if (bool) {

                localStorageService.set('authData', user);

                if (user.email == "farrukh@itapx.com") {
                    $location.path('/user/dashboard');
                }
                else {
                    $location.path('/app/dashboard');
                }

                

                

            } else {
                $scope.loginData.message = "Incorrect Email or Password";
                alert("Incorrect Email or Password");

            }

            return false;
        };


    }
]);
