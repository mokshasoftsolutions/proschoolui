angular.module('school_erp')
    .controller("barChartTwoController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'barChartTwoService', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices, barChartTwoService, ngDialog) {



        globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes;// Api list-name
                $scope.classId = $scope.classDatanew[0].class_id;
                console.log($scope.classId);
                $scope.populateSections($scope.classId);
            })
            .error(function (data, success) {
            })
        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                   
                    $scope.getStudentValue($scope.secId);

                })
                .error(function (data, success) {
                })
        }
         
        $scope.getExamSchedule = function () {
            examServices.getExamSchedule()
                .success(function (data, status) {
                    $scope.examSchedule = data.exam_schedules; // Api list-name
                    $scope.data.examSchedule_name = data.exam_schedules[0].exam_sch_id;

                })
                .error(function (data, success) { })
        }
         $scope.getExamSchedule();



        $scope.getStudentValue = function (secValue) {
            studentServices.getStudent(secValue)
                .success(function (data, status) {
                    $scope.students = data.students;
                    $scope.studentId = $scope.students[0].student_id;
                    console.log(JSON.stringify(data));
                    console.log($scope.studentId);

                    $scope.getExamMarks($scope.data.examSchedule_name, $scope.studentId);
                })
                .error(function (data, success) {
                })
        }


        $scope.getExamMarks = function (examScheduleId, studentId) {
            var arrData = new Array();
            var arrLabels = new Array();
            $scope.examData = [];



            $scope.data1 = [0];
            $scope.label1 = [0];
            barChartTwoService.getExamMarks(examScheduleId, studentId)
                .success(function (data, status) {
                    $scope.examData = data.barchart;
                    console.log("message1");
                    console.log(JSON.stringify($scope.examData));



                    $scope.examData1 = [];

                    $scope.array = $.map($scope.examData, function (item) {

                        $scope.examData1 = item.exams;
                        console.log("message2");
                        console.log(JSON.stringify($scope.examData1));
                        $scope.examData2 = [];
                        $scope.array1 = $.map($scope.examData1, function (item1) {
                            $scope.examData2 = item1.exam_evaluation;
                            console.log("message3");
                            console.log(JSON.stringify($scope.examData2));
                            arrLabels.push(item1.exam_paper_title);
                            $scope.maxMarks = item1.max_marks;
                            console.log($scope.maxMarks);
                            $scope.label1 = [];
                            if (arrLabels != null) {
                                for (var i = 0; i < arrLabels.length; i++) {
                                    $scope.label1.push(arrLabels[i]);
                                }
                            }
                            console.log($scope.label1);

                            $scope.array2 = $.map($scope.examData2, function (item2) {

                                $scope.data2 = JSON.parse(item2.marks);
                                arrData.push($scope.data2);
                                $scope.data1 = [];

                                for (var j = 0; j < arrData.length; j++) {
                                    $scope.data1.push(arrData[j]);
                                }
                                console.log($scope.data1);

                                return [[item.exam_evaluation]];
                                //, item.student_name
                            });
                            return [[item.exams]];
                            //, item.student_name
                        });


                        return [[item]];
                        //, item.student_name
                    });

                    $scope.myJson = {
                        "graphset": [
                            {
                                "type": "bar",
                                "background-color": "white",
                                "title": {
                                    "text": "Examinations Report",
                                    "font-color": "#7E7E7E",
                                    "backgroundColor": "none",
                                    "font-size": "22px",
                                    "alpha": 1,
                                    "adjust-layout": true,
                                },
                                "plotarea": {
                                    "margin": "dynamic"
                                },

                                "plot": {
                                    "bars-space-left": 0.15,
                                    "bars-space-right": 0.15,
                                    "animation": {
                                        "effect": "ANIMATION_SLIDE_BOTTOM",
                                        "sequence": 0,
                                        "speed": 800,
                                        "delay": 800
                                    }
                                },
                                "scale-y": {
                                    "line-color": "#7E7E7E",
                                    "item": {
                                        "font-color": "#7e7e7e"
                                    },
                                    "values": "0:" + ($scope.maxMarks),
                                    "guide": {
                                        "visible": true
                                    },
                                    "label": {
                                        // "text": "$ Billions",
                                        "font-family": "arial",
                                        "bold": true,
                                        "font-size": "14px",
                                        "font-color": "#7E7E7E",
                                    },
                                },
                                "scaleX": {
                                    "values": $scope.label1,
                                    // [
                                    //     "stu1",
                                    //     "stu2",
                                    //     "stu3",
                                    //     "stu4"
                                    // ],
                                    "placement": "default",
                                    "tick": {
                                        "size": 58,
                                        "placement": "cross"
                                    },
                                    "itemsOverlap": true,
                                    "item": {
                                        "offsetY": -55
                                    }
                                },

                                "tooltip": {
                                    "visible": false
                                },
                                "crosshair-x": {
                                    "line-width": "100%",

                                    "alpha": 0.18,
                                    "plot-label": {

                                        //"background-color": "#8993c7",
                                        "header-text": "Paper: %kv"
                                    }
                                },
                                "series": [
                                    {
                                        "values": $scope.data1,
                                        //[
                                        //     37.47,
                                        //     57.59,
                                        //     45.65,
                                        //     37.43
                                        // ],
                                        "alpha": 0.95,
                                        "borderRadiusTopLeft": 7,
                                        "background-color": "#8993c7",
                                        "text": "Marks",
                                    }


                                ]
                            }
                        ]
                    };

                })
                .error(function (data, success) {
                })
        }

       
    }])
