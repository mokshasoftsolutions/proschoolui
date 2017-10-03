angular.module('school_erp')
    .controller("employeeAttendanceController", ['$http', '$scope', 'employeeServices', 'ngDialog', function($http, $scope, employeeServices, ngDialog) {
        $scope.employeeData = [];
        $scope.attendanceBox = [];
        $scope.employee = [];

        employeeServices.getEmployee()
            .success(function(data, status) {
                $scope.employeeData = data.employee;
                $scope.attendanceBox = [];
                $scope.attendanceStatus();
            })
            .error(function(data, success) {})

        $scope.addAttendance = function(employee, status) {
            var Attendance = {
                session: "morning",
                status: status
                }
            employeeServices.setAttendance(Attendance, employee.employee_id)
                .success(function(data, status) {

                    ngDialog.open({
                        template: '<p> Employee Attendance  submitted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];

                })
                .error(function(data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // To Select All for Bulk Attendance report
        $scope.tickAll = function(status) {
            $scope.attendanceBox.forEach(function(element) {
                if (status) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }

        // Mark bulk attendance status
        $scope.markAttendance = function(status) {
            $scope.attendanceBox.forEach(function(element) {
                if (element.selected) {
                    element.status = status;
                }
            });
        }

        // create a custom listing JSON data
        $scope.attendanceStatus = function() {
            $scope.employeeData.forEach(function(element) {
                var obj = {
                    employee_id: element.employee_id,
                    first_name: element.first_name, // remove
                    last_name: element.last_name, // remove
                    gender: element.gender,
                    job_category: element.job_category,
                    selected: false,
                    status: "none"
                }
                $scope.attendanceBox.push(obj);
            });
        }

        $scope.sendAttendanceHolder = [];
        $scope.submitBulkAttendance = function() {
            var allowSubmission = false;
            var dataB = $scope.attendanceBox;
            var i = 0;
           var filterBox = dataB.filter(function(data){
                return data.status == 'none';
            })

            if (filterBox.length == 0) {
                // $scope.attendanceBox.forEach(function(element) {
                //     var obj = {
                //         employee_id: element.employee_id,
                //         status: element.status
                //     }
                //     $scope.sendAttendanceHolder.push(obj);

                // });

                 angular.forEach($scope.attendanceBox,function(value,key){
                   var obj = {
                         employee_id: value.employee_id,
                        status: value.status
                    }
                    $scope.sendAttendanceHolder.push(obj);
                    })

                employeeServices.setBulkAttendance($scope.sendAttendanceHolder).success(function(data, status) {
                   $scope.sendAttendanceHolder=[];
                   ngDialog.open({
                    template: '<p> Attendance Updated Successful</p>',
                    plain: true
                });
                })
                .error(function(data, success) {
                    $scope.sendAttendanceHolder=[];
                    ngDialog.open({
                    template: '<p> Attendance Updated Failed</p>',
                    plain: true
                });
                })
            } else {
                ngDialog.open({
                    template: '<p> Few Employees are not marked properly</p>',
                    plain: true
                });
            }


        }

    }])