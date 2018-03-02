'use strict';
angular.module('naut').controller('userController', ['$scope', '$location', '$window', 'localStorageService',

    function ($scope, $location, $window, localStorageService) {
        $scope.model = {
            id: "1",
            firstName: "",
            lastName: "",
            roleName: "",
            roleId: "",
            isActive: true,
            email: "",
            password: "",
            confirmPassword: "",
            iCustomer: null,
            clientId: null,
            fkUser: 0,
            inviedPerson:''

        };



        if ($location.path() == "/app/users") {

            $scope.userList = localStorageService.get('users');

        }


        if ($location.path() == "/app/user") {

            $scope.roleList = [
                {
                    roleName: 'Super admin',
                    id: 1

                },
                {
                    roleName: 'Admin',
                    id: 2

                },
                {
                    roleName: 'Staff',
                    id: 3

                }
            ];



            $scope.userSubmit = function (bool) {
                if (bool) {



                    var userList = localStorageService.get('users');

                    if (userList == null) {
                        userList = [];
                    }


                    userList.push($scope.model);
                    console.log($scope.model);
                    localStorageService.set('users', userList);
                    window.location.href = "#/app/users";

                }
            };


            $scope.cancel = function () {

                window.location.href = "#/app/users";

            };




        }





    }
]);
