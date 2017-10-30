angular.module('school_erp')
    .controller("employeeController", ['$http', '$scope', '$rootScope', 'employeeServices','ngDialog','globalServices', function ($http, $scope, $rootScope, employeeServices,ngDialog,globalServices) {
        $scope.employeeData = [];
        $scope.editdata = [];

        $scope.gender=[{ name:"Male",id:"male"},{name:"Female",id:"female"}];

        $scope.employeeType=[{type:"Teaching",id:"teaching"},{type:"Non-Teaching",id:"non-teaching"},{type:"Administrative",id:"administrative"}];

        employeeServices.getEmployee()
            .success(function (data, status) {
                $scope.employeeData = data.employee;
            })
            .error(function (data, success) {
            })

        $scope.EditEmployee = function (value, employee) {

            console.log("messsage");
            $scope.employee = angular.copy($scope.employeeData[value]);
            $scope.employee_id = $scope.employee.employee_id;
            console.log($scope.employee_id);
            
            var EmployeeDetails = {
                gender: $scope.employee.gender,
                job_category: $scope.employee.job_category,
                experience: $scope.employee.experience,
                joined_on: $scope.employee.joined_on,
                email: $scope.employee.email,
                phone: $scope.employee.phone,
                school_id: $scope.employee.school_id,
            }
            console.log(EmployeeDetails);

            $scope.addEditEmployee(EmployeeDetails, $scope.employee_id);
        }

        $scope.addEditEmployee = function (EmployeeDetails, employee_id) {
            employeeServices.EditEmployee(EmployeeDetails, employee_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    employeeServices.getEmployee()
                        .success(function (data, status) {
                            $scope.employeeData = data.employee;
                        })
                        .error(function (data, success) {
                        })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteEmployee = function (value) {
            $scope.editdata = angular.copy($scope.employeeData[value]);
            $scope.employee_id = $scope.editdata.employee_id;
            console.log($scope.employee_id);
            employeeServices.DeleteEmployee($scope.employee_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Employee is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    employeeServices.getEmployee()
                        .success(function (data, status) {
                            $scope.employeeData = data.employee;
                        })
                        .error(function (data, success) {
                        })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }


         // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        // $scope.addEditEmployee = function (editdata) {

        //     var EmployeeDetails = $rootScope.editdata;
        //     $scope.employee_id = editdata[0].employee_id;
        //     console.log($scope.employee_id);

        //     employeeServices.EditEmployee(EmployeeDetails, $scope.employee_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Book is Edited Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.editdata = [];
        //             $scope.employeeData= [];
        //             employeeServices.getEmployee()
        //                 .success(function (data, status) {
        //                     $scope.employeeData = data.employee;
        //                 })
        //                 .error(function (data, success) {
        //                 })

        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }
        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel': $scope.$broadcast('export-excel', {});
                    break;
                default: console.log('no event caught');
            }
        }
    }])

