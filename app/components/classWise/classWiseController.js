angular.module('school_erp')
    .controller("classWiseController", ['$http', '$scope', 'globalServices', 'studentServices', 'subjectsServices', 'classWiseServices', 'sessionServices','assignServices','ngDialog', function ($http, $scope, globalServices, studentServices, subjectsServices, classWiseServices, sessionServices,assignServices, ngDialog) {
        $scope.days = [{
            name: "Sunday",
            id: 1
        },
        {
            name: "Monday",
            id: 2
        },
        {
            name: "Tuesday",
            id: 3
        },
        {
            name: "Wednesday",
            id: 4
        },
        {
            name: "Thursday",
            id: 5
        },
        {
            name: "Friday",
            id: 6
        },
        {
            name: "Saturday",
            id: 7
        }
        ]

        $scope.data = [];
        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })
        // $scope.getSession_timings = function () {
            sessionServices.getSession_timings()
            .success(function (data, status) {
                //console.log(JSON.stringify(data));
                $scope.sessionData = data.session_timings; // Api list-name
            })
            .error(function (data, success) { })

        // }


        $scope.populateSections = function (classId) {
            // $scope.secId = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.populateSubjects($scope.secId);


                })
                .error(function (data, success) {

                    $scope.populateSubjects($scope.secId);
                })
        }

        $scope.populateSubjects = function (secId) {
            $scope.subData = [];
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    $scope.subId = $scope.subData[0].subject_id;
                    //$scope.getChapters($scope.subId);
                    $scope.getTeachers($scope.subId);
                    $scope.getTimeTable(secId);
                })
                .error(function (data, success) {
                });
        }

        $scope.getTeachers = function (subjectId) {
            assignServices.getTeacherListBySubject(subjectId)
                .success(function (data, status) {
                    //  console.log(JSON.stringify(data));
                    $scope.teacherList = data.teachers// Api list-name

                      console.log($scope.teacherList);

                })
                .error(function (data, success) {
                })
        }
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

     
        $scope.getTimeTable = function (secId) {
            classWiseServices.getTimeTable(secId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                    $scope.timeTableData = [];

                    // var slots = [{ time: "09:30-10:30" },
                    // { time: "10:30-11:30" },
                    // { time: "11:30-12:30" },
                    // { time: "01:30-02:30" },
                    // { time: "02:30-03:30" },
                    // { time: "03:30-04:30" }]
                    angular.forEach($scope.sessionData, function (value, key) {
                        var dataObj = {
                            "session": value.session,
                            "start_time": value.start_time,
                            "end_time": value.end_time,
                            "data": { "monday": " ", "tuesday": " ", "wednesday": " ", "thursday": " ", "friday": " ", "saturday": " ", "sunday": " " },
                            "teacher": { "mon": "-", "tues": "-", "wednes": "-", "thurs": "-", "fri": "-", "satur": "-", "sun": "-" }
                        }
                        angular.forEach(data.timetable, function (valuesub, keysub) {
                            // console.log(valuesub.start_time);
                            // console.log(value.start_time);
                            if (valuesub.start_time == value.start_time) {

                                if (valuesub.day == "monday") {
                                    dataObj.data.monday = valuesub.name;
                                  
                                    dataObj.teacher.mon=valuesub.teacher_name;
                                } else if (valuesub.day == "tuesday") {
                                    dataObj.data.tuesday = valuesub.name;
                                    dataObj.teacher.tues=valuesub.teacher_name;
                                } else if (valuesub.day == "wednesday") {
                                    dataObj.data.wednesday = valuesub.name;
                                    dataObj.teacher.wednes=valuesub.teacher_name;
                                } else if (valuesub.day == "thrusday") {
                                    dataObj.data.thursday = valuesub.name;
                                    dataObj.teacher.thurs=valuesub.teacher_name;
                                } else if (valuesub.day == "friday") {
                                    dataObj.data.friday = valuesub.name;
                                    dataObj.teacher.fri=valuesub.teacher_name;
                                } else if (valuesub.day == "saturday") {
                                    dataObj.data.saturday = valuesub.name;
                                    dataObj.teacher.satur=valuesub.teacher_name;
                                } else if (valuesub.day == "sunday") {
                                    dataObj.data.sunday = valuesub.name;
                                    dataObj.teacher.sun=valuesub.teacher_name;
                                } else {

                                }

                            }

                        })


                        $scope.timeTableData.push(dataObj);

                    });


                    $scope.timetables = data.timetable;


                    $scope.id = $scope.timetables.id;
                    // $scope.studentId = $scope.students[0].student_id;
                    //console.log($scope.studentId);
                })
                .error(function (data, success) {
                })
        }


        $scope.addTimeTable = function (data, secId) {
            $scope.subId = $scope.data.subId;

            $scope.secId = secId;
            var TimeTableDetails = {
                day: $scope.data.select_day,
                // room_no: $scope.data.room_no,
                start_time: $scope.data.time_from,
                teacher_id: $scope.data.teacher_id
                //end_time: "4:30"
            }
            classWiseServices.setTimeTable(TimeTableDetails, $scope.secId, $scope.subId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>TimeTable is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getTimeTable($scope.secId);
                    // $scope.getEvaluation($scope.paperId , $scope.studentId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


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

