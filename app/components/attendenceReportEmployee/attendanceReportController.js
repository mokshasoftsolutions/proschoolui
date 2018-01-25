angular.module('school_erp')
    .controller("attendanceReportEmployeeController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'employeeServices', 'examServices', 'subjectsServices', 'studentServices', 'ngDialog', function ($http, $scope, $rootScope, $window, globalServices, employeeServices, examServices, subjectsServices, studentServices, ngDialog) {

        // $scope.select_date = new Date().toDateString();
        // $scope.initialLoadAttendence = false;
        // $scope.getAttendenceByDay = function (date) {
        //     $scope.initialLoadAttendence = true;
        //     var arrPresent = new Array();
        //     var arrAbsent = new Array();
        //     var arrLeave = new Array();
        //     $scope.attData = [];

        //     employeeServices.getEmployeeAttendenceByDay(date)
        //         .success(function (data, status) {
        //             $scope.attData = data.donutchart;
        //             console.log(JSON.stringify(data));
        //             // console.log($scope.examData);
        //             //$scope.chartdata = [[], [], []];

        //             if ($scope.attData == 0) {
        //                 // array empty or does not exist
        //                 $scope.chartdata = [
        //                     [],
        //                     [],
        //                     []
        //                 ];
        //                 if ($scope.chartdata) {
        //                     ngDialog.open({
        //                         template: '<p>Report is not available.</p>',
        //                         plain: true
        //                     });
        //                     // $window.alert("report not availabel");
        //                 }
        //                 console.log("report not available")
        //             }


        //             $scope.array = $.map($scope.attData, function (item) {
        //                 console.log(item);
        //                 //$scope.item=null;
        //                 // if (item.date == true) {
        //                     if (item.status == "Present") {
        //                         arrPresent.push(item.status);

        //                         $scope.data1 = [];
        //                         for (var i = 0; i < arrPresent.length; i++) {
        //                             $scope.data1.push(arrPresent[i]);
        //                         }
        //                         console.log($scope.data1);
        //                         $scope.present = ($scope.data1).length;
        //                         console.log($scope.present);
        //                     } else if (item.status == "Absent") {

        //                         arrAbsent.push(item.status);

        //                         $scope.label1 = [];
        //                         for (var j = 0; j < arrAbsent.length; j++) {
        //                             $scope.label1.push(arrAbsent[j]);

        //                         }
        //                         console.log($scope.label1);
        //                         $scope.absent = ($scope.label1).length;
        //                         console.log($scope.absent);


        //                     } else if (item.status == "On Leave") {

        //                         arrLeave.push(item.status);

        //                         $scope.leave1 = [];
        //                         for (var k = 0; k < arrLeave.length; k++) {
        //                             $scope.leave1.push(arrLeave[k]);

        //                         }
        //                         console.log($scope.leave1);
        //                         $scope.leave = ($scope.leave1).length;
        //                         console.log($scope.leave);
        //                     }
        //                 // }
        //                 $scope.chartdata = [
        //                     [$scope.present],
        //                     [$scope.absent],
        //                     [$scope.leave]
        //                 ];
        //                 return;
        //             });

        //             $scope.myJson = {
        //                 type: "ring",
        //                 title: {
        //                     text: 'Attendance Report'
        //                 },
        //                 plot: {
        //                     slice: 60,
        //                     detach: false,
        //                     tooltip: {
        //                         fontSize: 16,
        //                         anchor: 'c',
        //                         x: '50%',
        //                         y: '48%',
        //                         sticky: true,
        //                         backgroundColor: 'none',
        //                         text: '<span style="color:%color">%t</span><br><span style="color:%color">%v</span>'
        //                     }
        //                 },
        //                 legend: {
        //                     verticalAlign: "bottom",
        //                     align: "center"
        //                 },
        //                 series: [{
        //                     //values : [50],
        //                     text: "present"
        //                 },
        //                 {
        //                     //values : [35],
        //                     text: "absent"
        //                 },
        //                 {
        //                     //values : [20],
        //                     text: "leave"
        //                 }
        //                 ]
        //             };

        //         })
        //         .error(function (data, success) { })
        // }
        // $scope.getAttendenceByDay($scope.select_date)

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


        $scope.getEmployeeByCategory = function (category) {
            employeeServices.getEmployeeByCategory(category)
                .success(function (data, status) {
                    //   console.log(JSON.stringify(data));
                    $scope.employeeData = data.employees;
                    $scope.employeeId = data.employees[0].employee_id;
                    //  console.log($scope.employeeId);
                    $scope.getAttendenceByMonth($scope.select_month, $scope.employeeId);

                })
                .error(function (data, success) { })
        }

        $scope.getAttendenceByMonth = function (month, employeeId) {
            $scope.pdf = false;
            var arrPresent = new Array();
            var arrAbsent = new Array();
            var arrLeave = new Array();
            $scope.attData = [];
            employeeServices.getAttendenceByMonth(month, employeeId)
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
                    $scope.getAttendenceByMonth($scope.select_month, $scope.employeeId);
                    
                   
                }
            });
        }


    }])
