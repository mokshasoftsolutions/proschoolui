angular.module('school_erp')
    .controller("reportOneController", ['$http', '$scope', '$rootScope', '$window', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'donutChartOneService', 'ngDialog', function ($http, $scope, $rootScope, $window, globalServices, examServices, subjectsServices, studentServices, donutChartOneService, ngDialog) {
        $scope.evalData = [];
        $scope.data = [];
        $scope.select_date = "2017-09-12";
        $scope.initialLoadAttendence = false;

        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classDatanew = data.school_classes; // Api list-name
                    $scope.classId = data.school_classes[0].class_id;
               
                    $scope.populateSections($scope.classId);
                })
                .error(function (data, success) {})
        }
        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = data.class_sections[0].section_id;
                if($scope.initialLoadAttendence == false){
                     $scope.getAttendence($scope.select_date, $scope.classId, $scope.secId);
                }
                    
                    // $scope.getAttendence($scope.classId,$scope.secId);

                })
                .error(function (data, success) {})
        }

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        // $scope.getDate = function (select_date) {
         
        //     $scope.date1 = $scope.select_date
        //     console.log($scope.date1);
          
        //     $scope.getAttendence($scope.date1, $scope.classId, $scope.secId);
        //     console.log($scope.date1);
        // }

        $scope.getAttendence = function (date, classId, secId) {
            $scope.initialLoadAttendence = true;
            var arrPresent = new Array();
            var arrAbsent = new Array();
            var arrLeave = new Array();
            $scope.attData = [];
            
            donutChartOneService.getAttendence(date, classId, secId)
                .success(function (data, status) {
                    $scope.attData = data.donutchart;
                    console.log(JSON.stringify(data));
                    // console.log($scope.examData);
                    //$scope.chartdata = [[], [], []];

                    if ($scope.attData == 0) {
                        // array empty or does not exist
                        $scope.chartdata = [
                            [],
                            [],
                            []
                        ];
                        if ($scope.chartdata) {
                            ngDialog.open({
                                template: '<p>Report is not available.</p>',
                                plain: true
                            });
                            // $window.alert("report not availabel");
                        }
                        console.log("report not available")
                    }


                    $scope.array = $.map($scope.attData, function (item) {
                        console.log(item);
                        //$scope.item=null;
                        if (item.status == "Present") {
                            arrPresent.push(item.status);

                            $scope.data1 = [];
                            for (var i = 0; i < arrPresent.length; i++) {
                                $scope.data1.push(arrPresent[i]);
                            }
                            console.log($scope.data1);
                            $scope.present = ($scope.data1).length;
                            console.log($scope.present);
                        } else if (item.status == "Absent") {

                            arrAbsent.push(item.status);

                            $scope.label1 = [];
                            for (var j = 0; j < arrAbsent.length; j++) {
                                $scope.label1.push(arrAbsent[j]);

                            }
                            console.log($scope.label1);
                            $scope.absent = ($scope.label1).length;
                            console.log($scope.absent);


                        } else if (item.status == "On Leave") {

                            arrLeave.push(item.status);

                            $scope.leave1 = [];
                            for (var k = 0; k < arrLeave.length; k++) {
                                $scope.leave1.push(arrLeave[k]);

                            }
                            console.log($scope.leave1);
                            $scope.leave = ($scope.leave1).length;
                            console.log($scope.leave);
                        }
                        $scope.chartdata = [
                            [$scope.present],
                            [$scope.absent],
                            [$scope.leave]
                        ];
                        return;
                    });

                    $scope.myJson = {
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
                                text: "present"
                            },
                            {
                                //values : [35],
                                text: "absent"
                            },
                            {
                                //values : [20],
                                text: "leave"
                            }
                        ]
                    };

                })
                .error(function (data, success) {})
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            // $scope.populateSubjects($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
        }


    }])
