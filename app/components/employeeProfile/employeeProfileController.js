angular.module('school_erp')
    .controller('employeeProfileController', ['$scope', 'ngDialog', 'globalServices', 'employeeServices','employeeProfileServices','$stateParams', function ($scope, ngDialog, globalServices, employeeServices,employeeProfileServices,$stateParams) {

        var d = new Date();
        var n = d.getMonth() + 1;
        $scope.employeeType = [{ type: "Teaching", id: "teaching" }, { type: "Non-Teaching", id: "non-teaching" }, { type: "Administrative", id: "administrative" }];
        $scope.select_month = n;
        $scope.months = [{
            name: "January",
            id: 1
        },
        {
            name: "February",
            id: 2
        },
        {
            name: "March",
            id: 3
        },
        {
            name: "April",
            id: 4
        },
        {
            name: "May",
            id: 5
        },
        {
            name: "June",
            id: 6
        },
        {
            name: "July",
            id: 7
        },
        {
            name: "August",
            id: 8
        },
        {
            name: "September",
            id: 9
        },
        {
            name: "October",
            id: 10
        },
        {
            name: "November",
            id: 11
        }, {
            name: "December",
            id: 12
        }
        ]

        $scope.getEmployeeById = function (employee_id) {

            employeeServices.getEmployeeById(employee_id)
                .success(function (data, status) {
                     console.log(JSON.stringify(data));
                    $scope.employeeData = data.employee;
                    $scope.employeePhoto = globalServices.globalValue.baseURL + 'api/image/' + $scope.employeeData[0].employeeImage[0].filename;

                })
                .error(function (data, success) {
                })
        }

        $scope.getAttendenceByMonth = function (month) {
            $scope.pdf = false;
            var arrPresent = new Array();
            var arrAbsent = new Array();
            var arrLeave = new Array();
            $scope.attData = [];
            employeeServices.getAttendenceByMonth(month, $stateParams.employee)
                .success(function (data, status) {
                    $scope.attData = data.donutchart;
                    //   console.log(JSON.stringify(data));
                    // $scope.chartdata = [[0], [0], [0]];
                    if ($scope.attData == 0) {
                        // array empty or does not exist
                        $scope.chartdataMonth = [
                            [],
                            [],
                            []
                        ];
                        if ($scope.chartdataMonth) {
                            ngDialog.open({
                                template: '<p>Report is not available.</p>',
                                plain: true
                            });
                            // $window.alert("report not availabel");
                        }
                        //  console.log("report not available")
                    }
                    else {
                        $scope.chartdataMonth = [
                            [data.onleave],
                            [data.absent],
                            [data.present]


                        ];
                    }

                    // $scope.array = $.map($scope.attData, function (item) {

                    //     if (item.status == "Present") {
                    //         arrPresent.push(item.status);

                    //         $scope.data1 = [];
                    //         for (var i = 0; i < arrPresent.length; i++) {
                    //             $scope.data1.push(arrPresent[i]);
                    //         }
                    //         console.log($scope.data1);
                    //         $scope.present = ($scope.data1).length;
                    //         console.log($scope.present);
                    //     } else if (item.status == "Absent") {

                    //         arrAbsent.push(item.status);

                    //         $scope.label1 = [];
                    //         for (var j = 0; j < arrAbsent.length; j++) {
                    //             $scope.label1.push(arrAbsent[j]);

                    //         }
                    //         console.log($scope.label1);
                    //         $scope.absent = ($scope.label1).length;
                    //         console.log($scope.absent);


                    //     } else if (item.status == "On Leave") {

                    //         arrLeave.push(item.status);

                    //         $scope.leave1 = [];
                    //         for (var k = 0; k < arrLeave.length; k++) {
                    //             $scope.leave1.push(arrLeave[k]);

                    //         }
                    //         console.log($scope.leave1);
                    //         $scope.leave = ($scope.leave1).length;
                    //         console.log($scope.leave);


                    //     }
                    //     $scope.chartdata1 = [
                    //         [$scope.present],
                    //         [$scope.absent],
                    //         [$scope.leave]
                    //     ];

                    //     //arrLabels.push(item.student_name);
                    //     return;
                    //     //, item.student_name
                    // });
                    //$scope.chartdata = [[40], [30], [20]];
                    $scope.myJsonMonth = {
                        type: "ring",
                        title: {
                            text: 'Attendance Report'
                        },
                        plot: {
                            slice: 60,
                            detach: false,
                            tooltip: {
                                fontSize: 16,
                                anchor: 'c',
                                x: '50%',
                                y: '48%',
                                sticky: true,
                                backgroundColor: 'none',
                                text: '<span style="color:%color">%t</span><br><span style="color:%color">%v</span>'
                            }
                        },
                        legend: {
                            verticalAlign: "bottom",
                            align: "center"
                        },
                        series: [{
                            //values : [50],
                            text: "leave"

                        },
                        {
                            //values : [35],
                            text: "absent"
                        },
                        {
                            //values : [20],
                            text: "present"
                        }
                        ]
                    };


                })

                .error(function (data, success) { })
        }


        $scope.generatePDF = function () {
            $scope.pdf = true;
            console.log("pdf message1");
            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 480,
                        }]
                    };
                    console.log("pdf message2");

                    pdfMake.createPdf(docDefinition).download("EmployeeAttendanceByMonth_Report.pdf");
                    $scope.getAttendenceByMonth($scope.select_month, $stateParams.employee);


                }
            });
        }

        $scope.selectedFile = null;

        $scope.loadFile = function (files) {

            //     console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                console.log($scope.selectedFile);
                $scope.message="";
                if ($scope.selectedFile.type != "image/jpeg" && $scope.selectedFile.type != "image/png") {
                    //     ngDialog.open({
                    //         template: '<p> Not a Image File </p>',
                    //         plain: true
                    //     });
                    //    $window.alert("Not a Image File");
                    $scope.message = "Not a Image File !..";
                }
                                                     
                else if($scope.selectedFile.size >= "1048576") {
                    $scope.message = "Image size exceed..(below 1MB)";

                }
            })

        }

        // Add attendance single
        $scope.editEmployeeImage = function () {
            console.log($scope.selectedFile);

            $scope.employee_id = $stateParams.employee;

            var file = $scope.selectedFile;
            var fd = new FormData();
            fd.append('file', file);

            employeeProfileServices.editEmployeeImage(fd, $scope.employee_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Employee Image editted  successfully </p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.selectedFile = null;
                    $scope.getEmployeeById($scope.employee_id);

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.EditEmployee_details = function (value, employee) {

            $scope.employee = angular.copy($scope.employeeData[value]);
            var EmployeeDetails = {
                first_name: $scope.employee.first_name,
                last_name: $scope.employee.last_name,
                blood_group: $scope.employee.blood_group,
                dob: $scope.employee.dob,
                gender: $scope.employee.gender,
                job_category: $scope.employee.job_category,
                experience: $scope.employee.experience,
                joined_on: $scope.employee.joined_on,
                email: $scope.employee.email,
                phone: $scope.employee.phone,
                employee_id: $scope.employee.employee_id,
                perm_city: $scope.employee.permanent_address[0].perm_city,
                perm_address: $scope.employee.permanent_address[0].perm_address,
                postal_code: $scope.employee.postal_code,
                state: $scope.employee.state,
                cur_address: $scope.employee.current_address[0].cur_address,
                // temp_address: $scope.employee.temp_address,
                martial_status: $scope.employee.martial_status,
                spoken_languages: $scope.employee.spoken_languages,
                alternate_email: $scope.employee.alternate_email,
                basic_pay: $scope.employee.basic_pay,
                salary_band: $scope.employee.salary_band,
                qualification: $scope.employee.qualification

            }
            console.log(JSON.stringify($scope.employee));
            // console.log(school_details);
            $scope.employee_id = $scope.employee.employee_id;
            console.log($scope.employee_id);

            $scope.addEditEmployee_details(EmployeeDetails, $scope.employee_id);
        }
        $scope.addEditEmployee_details = function (EmployeeDetails, employee_id) {
            employeeProfileServices.EditEmployee_details(EmployeeDetails, employee_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>session is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getEmployeeById($stateParams.employee);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }



        $scope.getEmployeeById($stateParams.employee);
        $scope.getAttendenceByMonth($scope.select_month);
    }])