angular.module('school_erp')
    .controller("attendanceListEmployeeController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'employeeServices', 'donutChartOneService', 'ngDialog', function ($http, $scope, $rootScope, $window, globalServices, examServices, subjectsServices, studentServices, employeeServices, donutChartOneService, ngDialog) {



        $scope.select_date = new Date().toDateString();

        $scope.initialLoadAttendence = false;


        $scope.getAttendenceByDay = function (date) {
            console.log("message");
            console.log(date);
            $scope.initialLoadAttendence = true;

            $scope.attData = [];

            employeeServices.getEmployeeAttendenceByDay(date)
                .success(function (data, status) {
                    $scope.attData = data.donutchart;
                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }





        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }

    }])
