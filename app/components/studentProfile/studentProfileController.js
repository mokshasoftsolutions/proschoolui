angular.module('school_erp')
    .controller("studentProfileController", ['$http', '$scope', '$rootScope', '$stateParams', 'studentServices', 'globalServices', 'studentProfileServices', 'ngDialog', function ($http, $scope, $rootScope, $stateParams, studentServices, globalServices, studentProfileServices, ngDialog) {
        $scope.studentData = [];

        //$scope.editdata= [];

        //  $scope.getClassesInitalLoad = function () {
        // globalServices.getClass()
        //     .success(function (data, status) {
        //         $scope.classData = data.school_classes;// Api list-name
        //         $scope.classId = $scope.classData[0].class_id;
        //         //console.log(JSON.stringify(data));
        //         $scope.populateSections($scope.classId)

        //     })
        //     .error(function (data, success) {
        //     })
        //  }
        // $scope.populateSections = function (classId) {
        //     globalServices.getSections(classId)
        //         .success(function (data, status) {
        //             $scope.secData = data.class_sections;// Api list-name
        //             $scope.secId = $scope.secData[0].section_id;
        //             //$scope.getStudentValue($scope.secId);
        //             $scope.getStudentById($stateParams.student);
        //             console.log($stateParams.student);
        //         })
        //         .error(function (data, success) {
        //         })
        // }

        // globalServices.getBusRoutes()
        //     .success(function (data, status) {
        //         $scope.routes = data.bus_routes;// Api list-name           
        //     })
        //     .error(function (data, success) {
        //     })


        // $scope.getStudentValue = function (secValue) {
        //     studentServices.getStudent(secValue)
        //         .success(function (data, status) {
        //             $scope.studentData = data.students;
        //             $scope.student_id = $scope.studentData[0].student_id;
        //             //  console.log(JSON.stringify(data));
        //             console.log($scope.student_id);
        //             $scope.getStudentById($scope.student_id);

        //         })
        //         .error(function (data, success) {
        //         })
        // }
        // $scope.zoom = function () {
        //     var imageId = document.getElementById('view');
        //     if (imageId.style.width == "400px") {
        //         imageId.style.width = "200px";
        //         imageId.style.height = "200px";
        //         imageId.style.borderRadius = "25px";

        //     } else {
        //         imageId.style.width = "400px";
        //         imageId.style.height = "400px";
        //         imageId.style.borderRadius = "97px";
        //     }
        // }

        $scope.studentDetails = [];
        // console.log(student);
        $scope.getStudentById = function (student_id) {
            studentServices.getStudentById(student_id)
                .success(function (data, status) {
                    //  console.log(JSON.stringify(data));
                    $scope.studentDetails = data.students;
                    // $scope.student_id = $scope.studentDetails.student_id;
                    // $scope.first_name = $scope.studentDetails.first_name;
                    // $scope.last_name = $scope.studentDetails.last_name;
                    // $scope.father_name = $scope.studentDetails.parents[0].parent_name;
                    // $scope.admission_no = $scope.studentDetails.admission_no;
                    // $scope.roll_no = $scope.studentDetails.roll_no;
                    // $scope.category = $scope.studentDetails.category;
                    // $scope.phone = $scope.studentDetails.phone;
                    // $scope.class_id = $scope.studentDetails.class_id;
                    // $scope.section = $scope.studentDetails.section_id;
                    //$scope.studentPhoto=globalServices.globalValue.baseURL+$scope.studentDetails.studentImage[0].imagePath;
                    $rootScope.studentPhoto = globalServices.globalValue.baseURL + 'api/image/' + $scope.studentDetails[0].studentImage[0].filename;
                    //$scope.studentPhoto=globalServices.globalValue.baseURL+"uploads"+'/'+"Jellyfish.jpg";
                    //   console.log($rootScope.studentPhoto);
                    // $scope.splited=$scope.studentPhoto.split('\\');
                    // $scope.splited =globalServices.globalValue.baseURL+$scope.splited[0]+'/'+$scope.splited[1];
                    //  console.log($scope.splited);
                    //$scope.username.push($scope.splited);
                    // console.log(JSON.stringify(data));
                    //console.log($scope.studentDetails);
                    //console.log($scope.student_id);
                    // console.log($scope.student_name);
                    // $scope.getStudentById($scope.student_id);

                })
                .error(function (data, success) {
                })
        }
        // console.log(student);
        //   $scope.studentPhoto=globalServices.globalValue.baseURL+'api/image/Jellyfish.jpg';
        //   $scope.image="Desert.jpg";
        //   $scope.getStudentPhoto = function () {
        //    $scope.student_id="Desert.jpg"
        //     studentServices.getStudentPhoto($scope.student_id)
        //         .success(function (file, status) {
        //             console.log("image........");
        //             $scope.image="Desert.jpg";
        //             $scope.studentPhoto=globalServices.globalValue.baseURL+'api/image/Jellyfish.jpg';

        //         })
        //         .error(function (data, success) {
        //         })
        // }

        // Role based Display



        // if ($rootScope.role == 'parent') {

        //     $scope.secId = $rootScope.student.section;
        //     $scope.getStudentValue($scope.secId);


        // } else {
        //     $scope.getClassesInitalLoad();
        // }


        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }


        // $scope.EditStudent = function (value, student) {

        //     console.log("messsage");
        //     $scope.student = angular.copy($scope.studentData[value]);
        //     $scope.student_id = $scope.student.student_id;
        //     console.log($scope.student_id);
        //     var StudentDetails = {
        //         class_id: $scope.student.class_id,
        //         //parent_name: $scope.parents[0].parent_name,

        //         dob: $scope.student.dob,
        //         gender: $scope.student.gender,
        //         category: $scope.student.category,
        //         phone: $scope.student.phone,

        //     }
        //     console.log(StudentDetails);

        //     $scope.addEditStudent(StudentDetails, $scope.student_id);
        // }

        // $scope.addEditStudent = function (StudentDetails, student_id) {
        //     studentServices.EditStudent(StudentDetails, student_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             $scope.getStudentValue($scope.secId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }

        // $scope.DeleteStudent = function (value) {
        //     $scope.editdata = angular.copy($scope.studentData[value]);
        //     $scope.student_id = $scope.editdata.student_id;
        //     console.log($scope.student_id);
        //     studentServices.DeleteStudent($scope.student_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Student is Deleted Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.editdata = [];
        //             $scope.getStudentValue($scope.secId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }

        // $scope.exportAction = function (option) {
        //     switch (option) {
        //         case 'pdf': $scope.$broadcast('export-pdf', {});
        //             break;
        //         case 'excel': $scope.$broadcast('export-excel', {});
        //             break;
        //         default: console.log('no event caught');
        //     }
        // }
        // $scope.getStudentPhoto();


        $scope.evalData = [];
        $scope.data = [];
        $scope.select_date = new Date().toDateString();
        $scope.initialLoadAttendence = false;

        // $scope.getClassesInitalLoad = function () {
        //     globalServices.getClass()
        //         .success(function (data, status) {
        //             $scope.classDatanew = data.school_classes; // Api list-name
        //             $scope.classId = data.school_classes[0].class_id;

        //             $scope.populateSections($scope.classId);
        //         })
        //         .error(function (data, success) { })
        // }
        // $scope.populateSections = function (classId) {
        //     globalServices.getSections(classId)
        //         .success(function (data, status) {
        //             $scope.secData = data.class_sections; // Api list-name
        //             $scope.secId = data.class_sections[0].section_id;
        //             $scope.getStudentValue($scope.secId);
        //             if ($scope.initialLoadAttendence == false) {
        //                 $scope.getAttendenceByDay($scope.select_date, $scope.classId, $scope.secId);
        //             }

        //             // $scope.getAttendence($scope.classId,$scope.secId);

        //         })
        //         .error(function (data, success) { })
        // }

        // // Role based Display
        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }


        // $scope.getDate = function (select_date) {

        //     $scope.date1 = $scope.select_date
        //     console.log($scope.date1);

        //     $scope.getAttendence($scope.date1, $scope.classId, $scope.secId);
        //     console.log($scope.date1);
        // }

        // $scope.getAttendenceByDay = function (date, classId, secId) {
        //     $scope.initialLoadAttendence = true;
        //     var arrPresent = new Array();
        //     var arrAbsent = new Array();
        //     var arrLeave = new Array();
        //     $scope.attData = [];

        //     studentServices.getAttendenceByDay(date, classId, secId)
        //         .success(function (data, status) {
        //             $scope.attData = data.donutchart;
        //             console.log(JSON.stringify(data));
        //             // console.log($scope.examData);
        //             //$scope.chartdata = [[], [], []];

        //             if (data.count == 0) {
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
        //             $scope.present = data.present;
        //             $scope.absent = data.absent;
        //             $scope.leave = data.onleave;

        //             // $scope.array = $.map($scope.attData, function (item) {
        //             //     console.log(item);
        //             //     //$scope.item=null;
        //             //     // if(item.date==true){
        //             //     if (item.status == "Present") {
        //             //         arrPresent.push(item.status);

        //             //         $scope.data1 = [];
        //             //         for (var i = 0; i < arrPresent.length; i++) {
        //             //             $scope.data1.push(arrPresent[i]);
        //             //         }
        //             //         console.log($scope.data1);
        //             //         $scope.present = ($scope.data1).length;
        //             //         console.log($scope.present);
        //             //     } else if (item.status == "Absent") {

        //             //         arrAbsent.push(item.status);

        //             //         $scope.label1 = [];
        //             //         for (var j = 0; j < arrAbsent.length; j++) {
        //             //             $scope.label1.push(arrAbsent[j]);

        //             //         }
        //             //         console.log($scope.label1);
        //             //         $scope.absent = ($scope.label1).length;
        //             //         console.log($scope.absent);


        //             //     } else if (item.status == "On Leave") {

        //             //         arrLeave.push(item.status);

        //             //         $scope.leave1 = [];
        //             //         for (var k = 0; k < arrLeave.length; k++) {
        //             //             $scope.leave1.push(arrLeave[k]);

        //             //         }
        //             //         console.log($scope.leave1);
        //             //         $scope.leave = ($scope.leave1).length;
        //             //         console.log($scope.leave);
        //             //     // }
        //             //     }

        //             //     return;
        //             // });

        //             $scope.chartdata = [
        //                 [$scope.present],
        //                 [$scope.absent],
        //                 [$scope.leave]
        //             ];

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


        var d = new Date();
        var n = d.getMonth() + 1;

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


        // $scope.getClassesInitalLoad = function () {
        //     globalServices.getClass()
        //         .success(function (data, status) {
        //             $scope.classDatanew = data.school_classes; // Api list-name
        //             $scope.classId = data.school_classes[0].class_id;
        //             console.log($scope.classId);
        //             $scope.populateSections($scope.classId);
        //         })
        //         .error(function (data, success) {})
        // }
        // $scope.populateSections = function (classId) {
        //     globalServices.getSections(classId)
        //         .success(function (data, status) {
        //             $scope.secData = data.class_sections; // Api list-name
        //             $scope.secId = data.class_sections[0].section_id;

        //         })
        //         .error(function (data, success) {})
        // }
        // $scope.getStudentValue = function (secValue) {
        //     studentServices.getStudent(secValue)
        //         .success(function (data, status) {
        //             $scope.students = data.students;
        //             $scope.studentId = data.students[0].student_id;
        //             //  console.log($scope.studentId);
        //             $scope.getAttendenceByMonth($scope.select_month);
        //         })
        //         .error(function (data, success) { })
        // }

        // Role based Display

        // $scope.getMonth = function (select_month) {
        //     $scope.monthId = $scope.select_month;
        //     console.log($scope.monthId);


        // }
        $scope.getAttendenceByMonth = function (month) {
            $scope.pdf = false;
            if ($rootScope.role == 'parent') {
                //     console.log("parent login");
                //   console.log($rootScope.student.student_id);

                $scope.student_id = $rootScope.student.student_id;
            }
            else {
                $scope.student_id = $stateParams.student;
            }
            var arrPresentMonth = new Array();
            var arrAbsentMonth = new Array();
            var arrLeaveMonth = new Array();
            $scope.attDataMonth = [];
            studentServices.getAttendenceByMonth(month, $scope.student_id)
                .success(function (data, status) {
                    $scope.attDataMonth = data.donutchart;
                    // $scope.class_name=$scope.attDataMonth[0].class_name;
                    // $scope.section_name=$scope.attDataMonth[0].section_name;
                    // console.log(JSON.stringify(data));
                    // $scope.chartdata = [[0], [0], [0]];
                    if ($scope.attDataMonth == 0) {
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
                        // console.log("report not available")
                    }
                    else {
                        $scope.class_name = $scope.attDataMonth[0].class_name;
                        $scope.section_name = $scope.attDataMonth[0].section_name;
                        $scope.presentMonth = data.present;
                        $scope.absentMonth = data.absent;
                        $scope.leaveMonth = data.onleave;
                        $scope.chartdataMonth = [


                            [$scope.leaveMonth],
                            [$scope.absentMonth],
                            [$scope.presentMonth]
                        ];

                    }

                    // $scope.array = $.map($scope.attDataMonth, function (item) {

                    //     if (item.status == "Present") {
                    //         arrPresentMonth.push(item.status);

                    //         $scope.dataMonth = [];
                    //         for (var i = 0; i < arrPresentMonth.length; i++) {
                    //             $scope.dataMonth.push(arrPresentMonth[i]);

                    //         }
                    //         console.log($scope.dataMonth);
                    //         $scope.presentMonth = ($scope.dataMonth).length;
                    //         console.log($scope.presentMonth);
                    //     } else if (item.status == "Absent") {

                    //         arrAbsentMonth.push(item.status);

                    //         $scope.labelMonth = [];
                    //         for (var j = 0; j < arrAbsentMonth.length; j++) {
                    //             $scope.labelMonth.push(arrAbsentMonth[j]);

                    //         }
                    //         console.log($scope.labelMonth);
                    //         $scope.absentMonth = ($scope.labelMonth).length;
                    //         console.log($scope.absentMonth);


                    //     } else if (item.status == "On Leave") {

                    //         arrLeaveMonth.push(item.status);

                    //         $scope.dataLableMonth = [];
                    //         for (var k = 0; k < arrLeaveMonth.length; k++) {
                    //             $scope.dataLableMonth.push(arrLeaveMonth[k]);

                    //         }
                    //         console.log($scope.dataLableMonth);
                    //         $scope.leaveMonth = ($scope.dataLableMonth).length;
                    //         console.log($scope.leave);


                    //     }
                    //     $scope.chartdataMonth = [
                    //         [$scope.presentMonth],
                    //         [$scope.absentMonth],
                    //         [$scope.leaveMonth]
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
            html2canvas(document.getElementById('chart'), {
                onrendered: function (canvas) {
                    var zingchart=canvas.toDataURL("image/png");
                    var doc =new jsPDF();
                    

                    doc.addImage(zingchart,'JPEG',20,20);
                   // var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: doc,
                            width: 480,
                        }]
                    };
                    console.log("pdf message2");

                    pdfMake.createPdf(docDefinition).download("StudentAttendanceByMonth_Report.pdf");
                    $scope.getAttendenceByMonth($scope.select_month, $stateParams.student);

                }
            });
        }


        $scope.generatePDF2 = function () {
            $scope.pdf = true;
            console.log("pdf message1");
            html2canvas(document.getElementById('chart'), {
                onrendered: function (canvas) {
                    var img=canvas.toDataURL("image/png");
                    var doc =new jsPDF();
                    

                    doc.addImage(img,'JPEG',20,20);
                    // var docDefinition = {
                    //     content: [{
                    //         image: data,
                    //         width: 480,
                    //     }]
                    // };
                    console.log("pdf message2");

                   doc.save('test.pdf');

                    pdfMake.createPdf(doc).download("StudentAttendanceByMonth_Report.pdf");
                    $scope.getAttendenceByMonth($scope.select_month, $stateParams.student);

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
        $scope.editStudentImage = function () {
            console.log($scope.selectedFile);
            if ($rootScope.role == 'parent') {
                //     console.log("parent login");
                //   console.log($rootScope.student.student_id);

                $scope.student_id = $rootScope.student.student_id;
            }
            else {
                $scope.student_id = $stateParams.student;
            }
            var file = $scope.selectedFile;
            var fd = new FormData();
            fd.append('file', file);

            studentProfileServices.editStudentImage(fd, $scope.student_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Student Image editted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.selectedFile = null;
                    $scope.getStudentById($scope.student_id);

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }




        $scope.EditStudent_details = function (value, student) {
            console.log("edit_student")
            $scope.student = angular.copy($scope.studentDetails[value]);
            var student_details = {
                admission_no: $scope.student.admission_no,
                class_name:$scope.student.school_classes[0].name,
                section_name:$scope.student.sections[0].name,
                surname: $scope.student.surname,
                first_name: $scope.student.first_name,
                last_name: $scope.student.last_name,
                gender: $scope.student.gender,
                religion: $scope.student.religion,  
                dob: $scope.student.dob,
                aadhar_no: $scope.student.aadhar_no,
                phone: $scope.student.phone,
                email: $scope.student.email,
                category: $scope.student.category,
                admission_date: $scope.student.admission_date,
                roll_no: $scope.student.roll_no,
                academic_year: $scope.student.academic_year,
                // bus_route_id: $scope.student.routeId,
                blood_group:$scope.student.blood_group,
                cur_address: $scope.student.current_address[0].cur_address,
                // cur_city: $scope.student.cur_city,
                // cur_state: $scope.student.cur_state,
                // cur_pincode: $scope.student.cur_pincode,
                // cur_long: $scope.student.cur_long,
                // cur_lat: $scope.student.cur_lat,
                perm_address: $scope.student.permanent_address[0].perm_address,
                // perm_city: $scope.student.perm_city,
                // perm_state: $scope.student.perm_state,
                // perm_pincode: $scope.student.perm_pincode,
                // perm_long: $scope.student.perm_long,
                // perm_lat: $scope.student.perm_lat,
                father_name: $scope.student.parents[1].parent_name,
                father_contact: $scope.student.parents[1].parent_contact,
                father_occupation: $scope.student.parents[1].occupation,
                mother_name: $scope.student.parents[0].parent_name,
                mother_contact: $scope.student.parents[0].parent_contact,
                mother_occupation: $scope.student.parents[0].occupation,
                gaurdian_name: $scope.student.parents[2].parent_name,
                gaurdian_contact: $scope.student.parents[2].parent_contact,
                gaurdian_relation: $scope.student.parents[2].parent_relation,
                // gaurdian_address: $scope.student.gaurdian_address,
                gaurdian_occupation: $scope.student.parents[2].occupation,
                // parent_account_create: $scope.student.parentAccount,
                // parent_account_new: $scope.student.parentAccountCreate,
                // parent_id: $scope.student.parentId



            }
            //  console.log(JSON.stringify($scope.student));
            console.log(student_details);
            $scope.student_id = $scope.student.student_id;
            //  console.log($scope.student_id);

            $scope.addEditStudent_details(student_details, $scope.student_id);
        }
        $scope.addEditStudent_details = function (student_details, student_id) {
            studentProfileServices.EditStudent_details(student_details, student_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>session is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getStudentById($scope.student_id);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        if ($rootScope.role == 'parent') {
            //     console.log("parent login");
            //   console.log($rootScope.student.student_id);
            $scope.secId = $rootScope.student.section_id;
            $scope.classId = $rootScope.student.class_id;
            $scope.student_id = $rootScope.student.student_id;
            //$scope.getAttendenceByDayStudent($scope.select_date,$scope.student_id);
            $scope.getAttendenceByMonth($scope.select_month);
            $scope.getStudentById($rootScope.student.student_id);
            //console.log($rootScope.studentId);
            // $scope.studentSelection = $rootScope.student._id;


        } else {
            $scope.getStudentById($stateParams.student);
            $scope.getAttendenceByMonth($scope.select_month);
            //   console.log($stateParams.student);
            // $scope.getClassesInitalLoad();
        }

        // Role based Display
        // $scope.showRole = function (role) {
        //     return globalServices.fetchRoleAuth(role);
        // }

        // if ($rootScope.role == 'parent') {

        //     $scope.secId = $rootScope.student.section_id;
        //     $scope.classId = $rootScope.student.class_id;
        //     $scope.student_id = $rootScope.student.student_id;
        //     //$scope.getAttendenceByDayStudent($scope.select_date,$scope.student_id);
        //     $scope.getAttendenceByMonth($scope.select_month, $scope.student_id);
        //     //  $scope.getStudentValue($scope.secId);

        // } else {
        //     $scope.getClassesInitalLoad();
        // }



    }])

