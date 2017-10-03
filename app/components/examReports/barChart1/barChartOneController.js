angular.module('school_erp')
    .controller("barChartOneController", ['$http', '$scope', 'globalServices', 'examServices', 'subjectsServices', 'studentServices', 'barChartOneService', 'ngDialog', function ($http, $scope, globalServices, examServices, subjectsServices, studentServices, barChartOneService, ngDialog) {
        // $scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        // $scope.series = ['Series A', 'Series B'];

        // $scope.data = [
        //     [65, 59, 80, 81, 56, 55, 40],
        //     [28, 48, 40, 19, 86, 27, 90]
        // ];


        // var arrData = new Array();
        // var arrLabels = new Array();
        // $scope.data = [];
        // $scope.labels = [];
        // $scope.data = [13, 44, 55];
        // $scope.labels = ['L', 'A', 'P'];


        // canvas_html = '<canvas id="chart-2" class="chart chart-doughnut" chart-data="data" chart-labels="labels"></canvas>';
        // $scope.myDataSource = {
        //     chart: {
        //         caption: "Harry's SuperMart",
        //         subCaption: "Top 5 stores in last month by revenue",
        //         numberPrefix: "$",
        //         theme: "ocean"
        //     },
        //     data: [{
        //         label: "Bakersfield Central",
        //         value: "880000"
        //     },
        //     {
        //         label: "Garden Groove harbour",
        //         value: "730000"
        //     },
        //     {
        //         label: "Los Angeles Topanga",
        //         value: "590000"
        //     },
        //     {
        //         label: "Compton-Rancho Dom",
        //         value: "520000"
        //     },
        //     {
        //         label: "Daly City Serramonte",
        //         value: "330000"
        //     }]
        // };

        $scope.evalData = [];
        $scope.data = [];
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
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) {
                })
        }

        examServices.getExamSchedule()
            .success(function (data, status) {
                $scope.examSchedule = data.exam_schedules;// Api list-name
                $scope.examScheduleId = $scope.examSchedule[0].exam_sch_id;
            })
            .error(function (data, success) {
            })


        $scope.getSubjects = function (secId) {
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subjectsData = data.subjects;
                    $scope.subjectId = $scope.subjectsData[0].subject_id;
                    $scope.getExamPapers($scope.subjectId, $scope.examScheduleId);


                })
                .error(function (data, success) {
                });
        }

        $scope.getExamPapers = function (examSubject, exSchedule) {
            examServices.getExamPapers(examSubject, exSchedule)
                .success(function (data, status) {
                    $scope.papers = data[exSchedule + '-' + examSubject];// Api list-name
                    $scope.paperId = $scope.papers[0].exam_paper_id;
                    console.log($scope.paperId);
                    $scope.getExamMarks($scope.paperId);
                })
                .error(function (data, success) {
                })
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
                    $scope.chartdata1 = [30, 20, 40, 80, 50, 40, 30, 60];
                    $scope.studata1 = ["stu1", "stu2", "stu3", "stu4", "stu5", "stu6", "stu7", "stu8"];
                    console.log($scope.chartdata1);

                  

                    $scope.array = $.map($scope.examData, function (item) {
                        //console.log([item.marks]);
                        //console.log([item.student_name]);
                        $scope.data2 = JSON.parse(item.marks);
                        arrData.push($scope.data2 );
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
        // $scope.chartdata1=[30,20,40,80];

        // $scope.myJson = {
        //     type: "bar",
        //     title: {
        //         backgroundColor: "transparent",
        //         fontColor: "black"

        //     },
        //     backgroundColor: "white",
        //     series: [
        //         {
        //            // values : [1,2,3,4],
        //             backgroundColor: "#4DC0CF"
        //         }
        //     ]
        // };
        //$scope.chartdata=[[30],[20],[40],[80],[10]];


        // $scope.myJson = {
        //     "type": "bar",
        //     "background-color": "#898d95 #4f4f4f",
        //     "border-radius-top-left": 13,
        //     "border-radius-top-right": 13,
        //     "border-radius-bottom-right": 10,
        //     "border-radius-bottom-left": 10,
        //     "title": {
        //         "text": "Examinations Report",
        //         "align": "center",
        //         "background-color": "#f7f7f7 #e3e3e9",
        //         "font-family": "Passion One",
        //         "font-size": "24px",
        //         "font-color": "#4f4f4f",
        //         "border-radius-top-left": 10,
        //         "border-radius-top-right": 10
        //     },
        //     "plot": {
        //         "border-radius-top-left": 10,
        //         "border-radius-top-right": 10,
        //         "value-box": {
        //             "visible": true,
        //             "font-color": "#fff",
        //             "placement": "in",
        //             "font-angle": -90,
        //             "offset-y": "20px",
        //             "font-size": "10px",
        //             "font-weight": "normal"
        //         }
        //     },
        //     "plotarea": {
        //         "background-color": "#6c6e72",
        //         "margin": "80px 60px 60px 80px"
        //     },
        //     "tooltip": {
        //         "border-radius": 6
        //     },
        //     "scale-x": {
        //         "values": [
        //             "2010",
        //             "2011",
        //             "2012",
        //             "2013",
        //             "2014<br>(PROJECTED)"
        //         ],
        //         "item": {
        //             "font-color": "#fff"
        //         },
        //         "line-color": "#fff",
        //         "line-width": "1px",
        //         "tick": {
        //             "visible": false
        //         },
        //         "guide": {
        //             "line-width": "1px",
        //             "line-color": "#fff",
        //             "line-style": "solid",
        //             "alpha": 0.2
        //         },
        //         "markers": [
        //             {
        //                 "type": "area",
        //                 "range": [
        //                     3.5,
        //                     5
        //                 ],
        //                 "background-color": "fff",
        //                 "alpha": 0.3
        //             }
        //         ]
        //     },
        //     "scale-y": {
        //         "label": {
        //             "text": "UNITS",
        //             "font-color": "#fff",
        //             "offset-x": "-10px"
        //         },
        //         "multiplier": true,
        //         "item": {
        //             "font-color": "#fff"
        //         },
        //         "line-color": "#fff",
        //         "line-width": "1px",
        //         "tick": {
        //             "visible": false
        //         },
        //         "guide": {
        //             "line-width": "1px",
        //             "line-color": "#fff",
        //             "line-style": "solid",
        //             "alpha": 0.2
        //         }
        //     },
        //     "legend": {
        //         "layout": "h",
        //         "background-color": "none",
        //         "border-width": 0,
        //         "shadow": 0,
        //         "y": "46px",
        //         "toggle-action": "remove",
        //         "item": {
        //             "font-color": "#fff"
        //         },
        //         "marker": {
        //             "type": "circle",
        //             "size": 6
        //         }
        //     },
        //     "series": [
        //         {
        //             "values": [
        //                 28761,
        //                 26340,
        //                 19291,
        //                 13856,
        //                 13124
        //             ],
        //             "text": "MODEL A10",
        //             "background-color": "#38353c",
        //             "background-image": "//www.zingchart.com/assets/chart-images/black40.png",
        //             "background-fit": "xy"
        //         },
        //         {
        //             "values": [
        //                 8124,
        //                 14298,
        //                 24346,
        //                 32282,
        //                 35934
        //             ],
        //             "text": "MODEL A20",
        //             "background-color": "#a50617",
        //             "background-image": "//www.zingchart.com/assets/chart-images/red40.png",
        //             "background-fit": "xy"
        //         }
        //     ]
        // };

        // zingchart.render({ 
        // 	id : 'myChart', 
        // 	data : myConfig, 
        // 	height: '100%', 
        // 	width: '100%' 
        //});

    }])