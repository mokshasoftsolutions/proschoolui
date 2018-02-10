angular.module('school_erp')
    .controller("attendanceListEmployeeController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'employeeServices', 'ngDialog', function ($http, $scope, $rootScope, $window, globalServices, examServices, subjectsServices, studentServices, employeeServices, ngDialog) {



        $scope.select_date = new Date().toDateString();


        $scope.initialLoadAttendence = false;


        $scope.getAttendenceByDay = function (date) {
            // console.log("message");
          //  console.log(date);
            $scope.initialLoadAttendence = true;
            $scope.pdf = false;

            // $scope.attDataEmp = [];
            $scope.attData = [];
            employeeServices.getEmployeeAttendenceByDay(date)
                .success(function (data, status) {
                    //   $scope.attDataEmp = data.donutchart;
                    $scope.attData = data.donutchart;
                    $scope.attDataList = [];
                    index = 0;
                    $scope.attData.forEach(function (element) {

                        var obj = {
                            id: index++,
                            employee_id: element.employee_id,

                            first_name: element.first_name,
                            last_name: element.last_name,
                            employee_type: element.employee_type,
                            gender:element.gender,
                            status:element.status


                        }
                        $scope.attDataList.push(obj);
                        //console.log($scope.teacherData);
                    })


                    

                    if ($scope.attData == 0) {
                        // array empty or does not exist
                        $scope.chartdataDay = [
                            [],
                            [],
                            []
                        ];
                        if ($scope.chartdataDay) {
                            ngDialog.open({
                                template: '<p>Report is not available.</p>',
                                plain: true
                            });
                            // $window.alert("report not availabel");
                        }
                        console.log("report not available")
                    }
                    else {
                        $scope.chartdataDay = [[data.onleave],
                        [data.absent],
                        [data.present]

                        ];
                    }


                    // $scope.array = $.map($scope.attData, function (item) {
                    //     console.log(item);
                    //     //$scope.item=null;
                    //     // if (item.date == true) {
                    //         if (item.status == "Present") {
                    //             arrPresent.push(item.status);

                    //             $scope.data1 = [];
                    //             for (var i = 0; i < arrPresent.length; i++) {
                    //                 $scope.data1.push(arrPresent[i]);
                    //             }
                    //             console.log($scope.data1);
                    //             $scope.present = ($scope.data1).length;
                    //             console.log($scope.present);
                    //         } else if (item.status == "Absent") {

                    //             arrAbsent.push(item.status);

                    //             $scope.label1 = [];
                    //             for (var j = 0; j < arrAbsent.length; j++) {
                    //                 $scope.label1.push(arrAbsent[j]);

                    //             }
                    //             console.log($scope.label1);
                    //             $scope.absent = ($scope.label1).length;
                    //             console.log($scope.absent);


                    //         } else if (item.status == "On Leave") {

                    //             arrLeave.push(item.status);

                    //             $scope.leave1 = [];
                    //             for (var k = 0; k < arrLeave.length; k++) {
                    //                 $scope.leave1.push(arrLeave[k]);

                    //             }
                    //             console.log($scope.leave1);
                    //             $scope.leave = ($scope.leave1).length;
                    //             console.log($scope.leave);
                    //         }
                    //     // }
                    //     $scope.chartdata = [
                    //         [$scope.present],
                    //         [$scope.absent],
                    //         [$scope.leave]
                    //     ];
                    //     return;
                    // });

                    $scope.myJsonDay = {
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

                    pdfMake.createPdf(docDefinition).download("EmployeesAttendance_Report.pdf");
                    $scope.getAttendenceByDay($scope.select_date);
                    
                   
                }
            });
        }

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

        $scope.generatePDFEmployee = function () {
            $scope.pdf = true;
            console.log("pdf message1");
            html2canvas(document.getElementById('exportthisemployee'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 480,
                        }]
                    };
                    console.log("pdf message2");

                    pdfMake.createPdf(docDefinition).download("EmployeesMonthlyAttendance_Report.pdf");
                    $scope.getAttendenceMonthByEmployee($scope.select_month);
                    
                   
                }
            });
        }
        $scope.getAttendenceMonthByEmployee = function (select_month) {
            $scope.initialLoadAttendence = true;
            $scope.pdf = false;

            employeeServices.getAttendenceMonthByEmployee(select_month)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.attDataMonth = data.employeeMonthlyAttendence;
                    $scope.present = $scope.attDataMonth[0].totalPresent;
                    // console.log($scope.present);
                    $scope.absent = $scope.attDataMonth[0].totaAbsent;
                    $scope.leave = $scope.attDataMonth[0].totalOnLeave;
                    $scope.chartdataMonth = [
                        [$scope.leave],
                        [$scope.absent],
                        [$scope.present]
                    ];
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

                            text: "leave"
                        },
                        {

                            text: "absent"
                        },
                        {

                            text: "present"
                        }
                        ]
                    };

                })
                .error(function (data, success) { })
        }




        $scope.getAttendenceByDay($scope.select_date);

        $scope.getAttendenceMonthByEmployee($scope.select_month);


        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

    }])
