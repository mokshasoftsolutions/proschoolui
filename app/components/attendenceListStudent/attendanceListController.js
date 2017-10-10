angular.module('school_erp')
    .controller("attendanceListController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'examServices', 'subjectsServices', 'studentServices','ngDialog', function ($http, $scope, $rootScope, $window, globalServices, examServices, subjectsServices, studentServices, ngDialog) {

        var d = new Date();
        var n = d.getMonth();

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

        $scope.evalData = [];
        $scope.data = [];
        $scope.select_date = new Date().toDateString();
        $scope.initialLoadAttendence = false;

        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classDatanew = data.school_classes; // Api list-name
                    $scope.classId = data.school_classes[0].class_id;

                    $scope.populateSections($scope.classId);
                })
                .error(function (data, success) { })
        }
        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = data.class_sections[0].section_id;
                    $scope.getStudentValue($scope.secId);
                    if ($scope.initialLoadAttendence == false) {
                        $scope.getAttendenceByDay($scope.select_date, $scope.classId, $scope.secId);
                    }

                    // $scope.getAttendence($scope.classId,$scope.secId);

                })
                .error(function (data, success) { })
        }

        $scope.getAttendenceByDay = function (date, classId, secId) {
            $scope.initialLoadAttendence = true;
            // var arrPresent = new Array();
            // var arrAbsent = new Array();
            // var arrLeave = new Array();
            //$scope.attDataStudent = [];
            $scope.attData = [];
            studentServices.getAttendenceByDay(date, classId, secId)
                .success(function (data, status) {
                    //$scope.attDataStudent = data.donutchart;
                    $scope.attData = data.donutchart;
                    // $scope.array = $.map($scope.attDataStudent, function (item) {

                    //     if (item.date == true) {

                    //         $scope.attData.push(item);
                    //         console.log("message");
                    //         console.log($scope.attData);


                    //     }

                    //     return;
                    // });



                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }



        $scope.getStudentValue = function (secValue) {
            studentServices.getStudent(secValue)
                .success(function (data, status) {
                    $scope.students = data.students;
                    $scope.studentId = data.students[0].student_id;
                    console.log($scope.studentId);
                })
                .error(function (data, success) { })
        }

        // Role based Display

        $scope.getMonth = function (select_month) {
            $scope.monthId = $scope.select_month;
            console.log($scope.monthId);
             $scope.getAttendenceByMonth($scope.monthId, $scope.studentId);

        }

        $scope.getAttendenceByMonth = function (month, studentId) {
            // var arrPresent = new Array();
            // var arrAbsent = new Array();
            // var arrLeave = new Array();
            $scope.attDataMonth = [];
            studentServices.getAttendenceByMonth(month, studentId)
                .success(function (data, status) {
                    $scope.attDataMonth = data.donutchart;
                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            $scope.getStudentValue($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
        }
    }])
