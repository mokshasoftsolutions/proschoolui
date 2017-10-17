angular.module('school_erp')
    .controller("studentAttendanceController", ['$http', '$scope', 'studentServices', 'globalServices', 'ngDialog', function ($http, $scope, studentServices, globalServices, ngDialog) {
        $scope.studentData = [];
        $scope.classDatanew = [];
        $scope.attendanceBox = [];

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes; // Api list-name
                $scope.classId = $scope.classDatanew[0].class_id;
                $scope.populateSections($scope.classId);
            })
            .error(function (data, success) { })

        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getStudents($scope.secId);
                })
                .error(function (data, success) { })
        }

        // Get All Students
        $scope.getStudents = function (classSecValue) {

            studentServices.getStudents(classSecValue)
                .success(function (data, status) {
                    $scope.studentData = data.students;
                    $scope.attendanceBox = [];
                    $scope.attendanceStatus();
                })
                .error(function (data, success) { })
        }

        // Add attendance single
        $scope.addAttendance = function (studentVal, status) {
            var Attendance = {
                class_id: $scope.classId,
                section_id: $scope.secId,
                session: "morning",
                status: status
            }
            console.log(Attendance);

            studentServices.setAttendance(Attendance, studentVal.student_id)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p> Student Attendance  submitted successfully </p>',
                        plain: true
                    });
                    $scope.data = [];

                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }




        $scope.students = [];

        // To Select All for Bulk Attendance report
        $scope.tickAll = function (status) {
            $scope.attendanceBox.forEach(function (element) {
                if (status) {
                    element.selected = true;
                } else {
                    element.selected = false;
                }
            });
        }

        // Mark bulk attendance status
        $scope.markAttendance = function (status) {
            $scope.attendanceBox.forEach(function (element) {
                if (element.selected) {
                    element.status = status;
                }
            });
        }

        // create a custom listing JSON data
        $scope.attendanceStatus = function () {
            $scope.studentData.forEach(function (element) {
                var obj = {
                    student_id: element.student_id,
                    admission_no: element.admission_no, // remove
                    roll_no: element.roll_no, // remove
                    first_name: element.first_name, // remove
                    last_name: element.last_name, // remove
                    selected: false,
                    status: "none"
                }
                $scope.attendanceBox.push(obj);
            });
        }

        $scope.sendAttendanceHolder = [];
        $scope.submitBulkAttendance = function () {
            var dataB = $scope.attendanceBox;
            var allowSubmission = false;
            var i = 0;
            var filterBox = dataB.filter(function (data) {
                return data.status == 'none';
            })
            console.log($scope.attendanceBox);
            if (filterBox.length == 0) {
                // $scope.attendanceBox.forEach(function(element) {
                //     var obj = {
                //         student_id: element.student_id,
                //         status: element.status
                //     }
                //     $scope.sendAttendanceHolder.push(obj);

                // });
                angular.forEach($scope.attendanceBox, function (value, key) {
                    var obj = {
                        student_id: value.student_id,
                        status: value.status
                    }
                    $scope.sendAttendanceHolder.push(obj);
                })
                console.log($scope.sendAttendanceHolder);
                studentServices.setBulkAttendance($scope.sendAttendanceHolder, $scope.classId, $scope.secId)
                    .success(function (data, status) {
                        $scope.sendAttendanceHolder = [];
                        ngDialog.open({
                            template: '<p> Student Attendance  submitted successfully </p>',
                            plain: true
                        });
                    })
                    .error(function (data, success) {
                        $scope.sendAttendanceHolder = [];
                    })
            } else {
                ngDialog.open({
                    template: '<p> Few students are not marked properly</p>',
                    plain: true
                });
            }


        }
    }])