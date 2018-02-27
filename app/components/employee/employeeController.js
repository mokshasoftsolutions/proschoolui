angular.module('school_erp')
    .controller("employeeController", ['$http', '$scope', '$rootScope', 'employeeServices', 'ngDialog', 'globalServices', function ($http, $scope, $rootScope, employeeServices, ngDialog, globalServices) {
        //$scope.employeeData = [];
        $scope.editdata = [];
        $scope.pdf = false;
        $scope.gender = [{ name: "Male", id: "male" }, { name: "Female", id: "female" }];

        $scope.employeeType = [{ type: "Teaching", id: "teaching" }, { type: "Non-Teaching", id: "non-teaching" }, { type: "Administrative", id: "administrative" }];
        $scope.getEmployee = function () {
            $scope.pdf = false;
            employeeServices.getEmployee()
                .success(function (data, status) {

                    $scope.employees = data.employee;
                    $scope.employeeData = [];
                    index = 0;
                    $scope.employees.forEach(function (element) {

                        var obj = {
                            id: index++,
                            employee_id: element.employee_id,
                            first_name: element.first_name,
                            last_name: element.last_name,
                            gender: element.gender,
                            job_category: element.job_category,
                            experience: element.experience,
                            joined_on: element.joined_on,
                            email: element.email,
                            phone: element.phone,
                            selected: false,

                        }
                        $scope.employeeData.push(obj);
                        // console.log("mesaage for section");
                        //console.log($scope.employeeData);
                    })
                })
                .error(function (data, success) {
                })
        }

        // To Select All for Bulk Attendance report
        $scope.tickAll = function (status) {
            $scope.employeeData.forEach(function (element) {
                if (status) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }






        $scope.sendEmployeeHolder = [];
        $scope.submitBulkDelete = function () {
            var dataB = $scope.employeeData;

            angular.forEach(dataB, function (element) {
                if (element.selected == true || element.selected == 'true') {
                    // console.log(element.student_id)
                    var obj = {
                        employee_id: element.employee_id,
                        // status: value.status
                    }
                    $scope.sendEmployeeHolder.push(obj);
                }
            });



            employeeServices.setBulkDeleteEmployess($scope.sendEmployeeHolder )
                .success(function (data, status) {
                    $scope.sendEmployeeHolder = [];
                    if (data == false || data == 'false') {
                        ngDialog.open({
                            template: '<p>Employees deleted successfully</p>',
                            plain: true
                        });
                        $scope.getEmployee();

                    }
                    else {
                        ngDialog.open({
                            template: '<p> Employees deleted  successfully </p>',
                            plain: true
                        });
                        $scope.getEmployee();

                    }

                })
                .error(function (data, success) {
                    $scope.sendEmployeeHolder = [];
                })


        }





        $scope.EditEmployee = function (value, employee) {


            $scope.employee_id = value;
            var EmployeeDetails = {
                gender: employee.gender,
                job_category: employee.job_category,
                experience: employee.experience,
                joined_on: employee.joined_on,
                email: employee.email,
                phone: employee.phone,
                school_id: employee.school_id,
            }
            // console.log(EmployeeDetails);

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
                    $scope.getEmployee();

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.generatePDF = function () {
            $scope.pdf = true;
            // console.log("pdf message1");
            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 480,
                        }]
                    };
                    //  console.log("pdf message2");

                    pdfMake.createPdf(docDefinition).download("Employees_Report.pdf");
                    $scope.getEmployee();
                }
            });
        }

        $scope.DeleteEmployee = function (value) {
            // $scope.editdata = angular.copy($scope.employeeData[value]);
            // $scope.employee_id = $scope.editdata.employee_id;
            //   console.log($scope.employee_id);
            $scope.employee_id = value;
            employeeServices.DeleteEmployee($scope.employee_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Employee is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getEmployee();
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
        $scope.getEmployee();
    }])

