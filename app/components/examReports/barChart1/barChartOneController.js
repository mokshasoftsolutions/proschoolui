angular.module('school_erp')
    .controller("barChartOneController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'barChartOneService', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices, barChartOneService, ngDialog) {
        
      
       
        globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes;// Api list-name
                $scope.classId = $scope.classDatanew[0].class_id;
                console.log($scope.classId);
                //$scope.getExamSchedule();
                $scope.populateSections($scope.classId);
            })
            .error(function (data, success) {
            })
       
        $scope.getExamSchedule = function () {
            examServices.getExamSchedule()
                .success(function (data, status) {
                    $scope.examSchedule = data.exam_schedules; // Api list-name
                    $scope.data.examSchedule_name = data.exam_schedules[0].exam_sch_id;
                    
                })
                .error(function (data, success) { })
        }

        $scope.getExamSchedule();
        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                  
                    $scope.getExamPapers($scope.data.examSchedule_name,$scope.secId);
                })
                .error(function (data, success) {
                })
        }

        


        $scope.getExamPapers = function (exSchedule, sectionId) {
            examServices.getExamPapersbySectionAndSchedule(exSchedule,sectionId)
                .success(function (data, status) {

                    // $scope.papers = data[exSchedule+'-'+examSubject];// Api list-name
                    $scope.papers = data.resultArray;
                    // $scope.paperId = $scope.papers[0].exam_paper_id;
                    $scope.data.paper_name = data.resultArray[0].exam_paper_id;
                    console.log($scope.data.paper_name);
                    //  $scope.getEvaluation($scope.data.studentId, $scope.data.examSchedule_name);
                    $scope.getExamMarks($scope.data.paper_name);

                })
                .error(function (data, success) { })
        }

       
        $scope.getExamMarks = function (paperId) {
            var arrData = new Array();
            var arrLabels = new Array();
            $scope.examData = [];
            $scope.data1 = [0];
            $scope.label1 = [0];
            barChartOneService.getExamMarks(paperId)
                .success(function (data, status) {
                    $scope.examData = data.barchart;
                    console.log(JSON.stringify($scope.examData));


                    $scope.maxMarks = 100;
                    // $scope.chartdata1 = [30, 20, 40, 80, 50, 40, 30, 60];
                    // $scope.studata1 = ["stu1", "stu2", "stu3", "stu4", "stu5", "stu6", "stu7", "stu8"];
                    //console.log($scope.chartdata1);



                    $scope.array = $.map($scope.examData, function (item) {
                        //console.log([item.marks]);
                        //console.log([item.student_name]);
                        $scope.data2 = JSON.parse(item.marks);
                        arrData.push($scope.data2);
                        arrLabels.push(item.student_name);
                        $scope.data1 = [];
                        $scope.label1 = [];
                        //$scope.data1.push(arrData.trim(""));
                        //  for (var j = 0; j < arrData.length; i++) {
                        //     $scope.data1.push(arrData[i]);
                        // }
                        // $scope.data1.push(arrData);


                        for (var j = 0; j < arrData.length; j++) {
                            $scope.data1.push(arrData[j]);
                        }

                        // $scope.data1.push(arrData.slice(0));

                        if (arrLabels != null) {
                            for (var i = 0; i < arrLabels.length; i++) {
                                $scope.label1.push(arrLabels[i]);
                            }
                        }
                        console.log($scope.data1);
                        console.log($scope.label1);
                        return [[item.marks, item.student_name]];
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
                                    "values": "0:100",
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
                                        "header-text": "Name: %kv"
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
