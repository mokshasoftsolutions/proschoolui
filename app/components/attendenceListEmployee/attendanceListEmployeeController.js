angular.module('school_erp')
    .controller("attendanceListEmployeeController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'employeeServices', 'ngDialog', function ($http, $scope, $rootScope, $window, globalServices, examServices, subjectsServices, studentServices, employeeServices, ngDialog) {



        $scope.select_date = new Date().toDateString();
        

        $scope.initialLoadAttendence = false;


        $scope.getAttendenceByDay = function (date) {
            // console.log("message");
             console.log(date);
            $scope.initialLoadAttendence = true;

           // $scope.attDataEmp = [];
            $scope.attData = [];
            employeeServices.getEmployeeAttendenceByDay(date)            
                .success(function (data, status) {
                 //   $scope.attDataEmp = data.donutchart;
                     $scope.attData=data.donutchart;
                    // $scope.array = $.map($scope.attDataEmp, function (item) {

                    //     if (item.date == true) {

                    //         $scope.attData.push(item);
                    //         console.log("message");
                    //         console.log($scope.attData);


                    //     }

                    //     return;
                    // });



                    // console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }
        $scope.getAttendenceByDay($scope.select_date);




        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }

    }])
