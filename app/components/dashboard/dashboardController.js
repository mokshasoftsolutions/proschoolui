angular.module('school_erp')
    .controller("dashboardController", ['$http', '$scope', '$compile', 'studentServices', 'chaptersServices', 'employeeServices', 'examServices', 'globalServices', 'subjectsServices', 'classWiseServices', 'NoticeBoardServices', 'schoolEventsServices', 'addVehicleServices', 'barChartOneService', 'ngDialog', '$rootScope', 'ngProgressFactory', 'routeGeoLocationServices', function ($http, $scope, $compile, studentServices, chaptersServices, employeeServices, examServices, globalServices, subjectsServices, classWiseServices, NoticeBoardServices, schoolEventsServices, addVehicleServices, barChartOneService, ngDialog, $rootScope, ngProgressFactory, routeGeoLocationServices) {
        // $scope.progressbar = ngProgressFactory.createInstance();
        // $scope.progressbar.start();

        $scope.evalData = [];
        $scope.data = [];
        $scope.employeeAttendance = [];
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
                    $scope.getTimeTable($scope.secId);

                    if ($scope.initialLoadAttendence == false) {
                        $scope.getAttendenceByDay($scope.select_date, $scope.classId, $scope.secId);
                        // $scope.getAttendence($scope.select_date, $scope.classId, $scope.secId);
                    }



                })
                .error(function (data, success) { })
        }

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }









        $scope.populateSubjects = function (secId) {
            $scope.subData = [];
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    // $scope.subId = $scope.subData[0].subject_id;
                    $scope.subId = data.subjects[0].subject_id;
                    //$scope.getChapters($scope.subId);
                    //$scope.getTimeTable($scope.subId);
                })
                .error(function (data, success) {
                });
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }








        //TimeTable

        $scope.getTimeTable = function (secId) {
            classWiseServices.getTimeTable(secId)
                .success(function (data, status) {
                    $scope.timeTableData = [];

                    var slots = [{ time: "09:30-10:30" },
                    { time: "10:30-11:30" },
                    { time: "11:30-12:30" },
                    { time: "01:30-02:30" },
                    { time: "02:30-03:30" },
                    { time: "03:30-04:30" }]
                    angular.forEach(slots, function (value, key) {
                        var dataObj = {
                            "start_time": value.time,
                            "data": { "monday": "--", "tuesday": "--", "wednesday": "--", "thursday": "--", "friday": "--", "saturday": "--", "sunday": "--" },
                        }
                        angular.forEach(data.timetable, function (valuesub, keysub) {

                            if (valuesub.start_time == value.time) {

                                if (valuesub.day == "monday") {
                                    dataObj.data.monday = valuesub.name;
                                } else if (valuesub.day == "tuesday") {
                                    dataObj.data.tuesday = valuesub.name;
                                } else if (valuesub.day == "wednesday") {
                                    dataObj.data.wednesday = valuesub.name;
                                } else if (valuesub.day == "thrusday") {
                                    dataObj.data.thursday = valuesub.name;
                                } else if (valuesub.day == "friday") {
                                    dataObj.data.friday = valuesub.name;
                                } else if (valuesub.day == "saturday") {
                                    dataObj.data.saturday = valuesub.name;
                                } else if (valuesub.day == "sunday") {
                                    dataObj.data.sunday = valuesub.name;
                                } else {

                                }

                            }

                        })


                        $scope.timeTableData.push(dataObj);

                    });


                    $scope.timetables = data.timetable;


                    $scope.id = $scope.timetables.id;

                })
                .error(function (data, success) {
                })
        }


        //Student Attendance

        //Student Attendance List

        $scope.getAttendenceByDay = function (date, classId, secId) {
            $scope.initialLoadAttendence = true;

            $scope.attData = [];

            studentServices.getAttendenceByDay(date, classId, secId)
                .success(function (data, status) {
                    $scope.attData = data.donutchart;
                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }


        //Student Attendance Report

        $scope.getAttendenceByDay = function (date, classId, secId) {
            $scope.initialLoadAttendence = true;
            var arrPresent = new Array();
            var arrAbsent = new Array();
            var arrLeave = new Array();
            $scope.attData = [];

            studentServices.getAttendenceByDay(date, classId, secId)
                .success(function (data, status) {
                    $scope.attData = data.donutchart;
                    console.log(JSON.stringify(data));
                    // console.log($scope.examData);
                    //$scope.chartdata = [[], [], []];

                    if ($scope.attData == 0) {
                        // array empty or does not exist
                        $scope.chartdataStudent = [
                            [],
                            [],
                            []
                        ];
                        if ($scope.chartdataStudent) {
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
                        $scope.chartdataStudent = [
                            [$scope.present],
                            [$scope.absent],
                            [$scope.leave]
                        ];
                        return;
                    });

                    $scope.myJsonStudent = {
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
                .error(function (data, success) { })
        }




        //Employee Attendance

        //Employee Attendance List


        $scope.getEmpAttendenceByDay = function (date) {
            console.log("message");
            console.log(date);
            //$scope.initialLoadAttendence = true;

            $scope.attDataEmp = [];

            employeeServices.getEmployeeAttendenceByDay(date)
                .success(function (data, status) {
                    $scope.attDataEmp = data.donutchart;
                    console.log(JSON.stringify(data));
                })
                .error(function (data, success) { })
        }
        $scope.getEmpAttendenceByDay($scope.select_date);


        //Employee Attendance Report


        $scope.getEmpAttendenceByDayReport = function (date) {
            //$scope.initialLoadAttendence = true;
            var arrPresentEmp = new Array();
            var arrAbsentEmp = new Array();
            var arrLeaveEmp = new Array();
            $scope.attDataEmp = [];

            employeeServices.getEmployeeAttendenceByDay(date)
                .success(function (data, status) {
                    $scope.attDataEmp = data.donutchart;
                    console.log(JSON.stringify(data));
                    console.log("messagess............");
                    // console.log($scope.examData);
                    //$scope.chartdata = [[], [], []];

                    if ($scope.attDataEmp == 0) {
                        // array empty or does not exist
                        $scope.chartdataEmp = [
                            [],
                            [],
                            []
                        ];
                        if ($scope.chartdataEmp) {
                            ngDialog.open({
                                template: '<p>Report is not available.</p>',
                                plain: true
                            });
                            // $window.alert("report not availabel");
                        }
                        console.log("report not available")
                    }


                    $scope.array = $.map($scope.attDataEmp, function (item) {
                        console.log(item);
                        //$scope.item=null;
                        // if (item.date == true) {
                        if (item.status == "Present") {
                            arrPresentEmp.push(item.status);

                            $scope.dataEmp = [];
                            for (var i = 0; i < arrPresentEmp.length; i++) {
                                $scope.dataEmp.push(arrPresentEmp[i]);
                            }
                            console.log($scope.dataEmp);
                            $scope.presentEmp = ($scope.dataEmp).length;
                            console.log($scope.presentEmp);
                        } else if (item.status == "Absent") {

                            arrAbsentEmp.push(item.status);

                            $scope.labelEmp = [];
                            for (var j = 0; j < arrAbsentEmp.length; j++) {
                                $scope.labelEmp.push(arrAbsentEmp[j]);

                            }
                            console.log($scope.labelEmp);
                            $scope.absentEmp = ($scope.labelEmp).length;
                            console.log($scope.absentEmp);


                        } else if (item.status == "On Leave") {

                            arrLeaveEmp.push(item.status);

                            $scope.leaveEmp = [];
                            for (var k = 0; k < arrLeaveEmp.length; k++) {
                                $scope.leaveEmp.push(arrLeaveEmp[k]);

                            }
                            console.log($scope.leaveEmp);
                            $scope.leaveEmp = ($scope.leaveEmp).length;
                            console.log($scope.leaveEmp);
                        }
                        // }
                        $scope.chartdataEmp = [
                            [$scope.presentEmp],
                            [$scope.absentEmp],
                            [$scope.leaveEmp]
                        ];
                        return;
                    });

                    $scope.myJsonEmp = {
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
                .error(function (data, success) { })
        }

        $scope.getEmpAttendenceByDayReport($scope.select_date);


        //Buses
        addVehicleServices.getVehicle()
            .success(function (data, status) {
                $scope.vehicles = data.vehicles;
                console.log(JSON.stringify(data))
            })
            .error(function (data, success) {
            });

        // Geo Location 


        // Map Settings //
        $scope.getAllDevicesGeolocation = function () {

            var mapOptions = {
                center: new google.maps.LatLng(17.745875, 83.314301),
                zoom: 0,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);
            //   // Geo Location /
            //     navigator.geolocation.getCurrentPosition(function(pos) {
            //         map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            //         var myLocation = new google.maps.Marker({
            //             position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            //             map: map,
            //             animation: google.maps.Animation.DROP,
            //             title: "My Location"
            //         });
            //     });
            $scope.map = map;
            // Additional Markers //
            $scope.markers = [];
            var image = {
                url: 'dist/img/school_bus.png',
                // This marker is 20 pixels wide by 32 pixels high.
                scaleSize: new google.maps.Size(40, 60),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0),
                // The anchor for this image is the base of the flagpole at (0, 32).
                anchor: new google.maps.Point(0, 32)
            };
            var infoWindow = new google.maps.InfoWindow();
            var createMarker = function (info) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(info.latitude, info.longitude),
                    map: $scope.map,
                    icon: image,
                    // animation: google.maps.Animation.DROP,
                    title: info.address
                });
                marker.content = '<div class="infoWindowContent"><h2>Bus Id : ' + info.deviceid + '</h2></div>';
                google.maps.event.addListener(marker, 'click', function () {
                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                    infoWindow.open($scope.map, marker);
                });
                $scope.map.setZoom(20);
                $scope.map.panTo(marker.position)
                $scope.markers.push(marker);
                //$scope.getGeolocation();
            }

            console.log("message for geolocation")
            // $http({ method: 'GET', url: "http://192.168.1.12:4005/api/get_all_tracking" }).
            //"http://192.168.1.14:2016/netcomp/getAllDevicesDetails"
            //$http.get("http://192.168.1.10:2016/netcomp/getAllPositionsDetails",{headers: { 'Content-type': 'application/json'}}).

            routeGeoLocationServices.getAllGeolocations().
                success(function (data, status) {
                    $scope.status = status;
                    $scope.JSONdata = data;
                    console.log("geolacation");
                    console.log(JSON.stringify(data));

                    $scope.locations = data;
                    console.log($scope.locations);
                    for (i = 0; i < $scope.locations.length; i++) {
                        createMarker($scope.locations[i]);
                    }
                }).
                error(function (data, status) {
                    $scope.JSONdata = data || "Request failed";
                    $scope.status = status;
                    console.log($scope.data + $scope.status);
                });


        };
        $scope.getAllDevicesDetails = function () {
            google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.getAllDevicesGeolocation());

        }










        //School Events
        schoolEventsServices.getEvents()
            .success(function (data, status) {
                // console.log(JSON.stringify(data));
                // $scope.eventData = data.school_events;

                angular.forEach(data.school_events, function (value, key) {


                    $scope.eventsData.push({
                        title: value.event_title,
                        start: new Date(value.date),
                        end: new Date(value.date),
                        className: value.description,
                        allDay: false
                    });
                })
            })
            .error(function (data, success) {
            })

        $scope.eventsData = [];

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'Hungarian';

        $scope.eventsF = function (start, end, timezone, callback) {

            callback($scope.eventsData);
        };

        /* alert on eventClick */
        $scope.alertOnEventClick = function (date, jsEvent, view) {
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function (sources, source) {
            var canAdd = 0;
            angular.forEach(sources, function (value, key) {
                if (sources[key] === source) {
                    sources.splice(key, 1);
                    canAdd = 1;
                }
            });
            if (canAdd === 0) {
                sources.push(source);
            }
        };
        /* remove event */
        $scope.remove = function (index) {
            $scope.eventsData.splice(index, 1);
        };
        /* Change View */
        $scope.changeView = function (view, calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
        };
        /* Change View */
        $scope.renderCalender = function (calendar) {
            if (uiCalendarConfig.calendars[calendar]) {
                uiCalendarConfig.calendars[calendar].fullCalendar('render');
            }
        };
        /* Render Tooltip */
        $scope.eventRender = function (event, element, view) {
            element.attr({
                'tooltip': event.title,
                'tooltip-append-to-body': true
            });
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar: {
                height: 450,
                editable: true,
                header: {
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function () {
            if ($scope.changeTo === 'Hungarian') {
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo = 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.eventsData];
        console.log($scope.eventsData);
        $scope.eventSources2 = [$scope.eventsF, $scope.eventsData];




        // Online Notice Board

        NoticeBoardServices.getNoticeBoard()
            .success(function (data, status) {
                $scope.NoticeBoardData = data.messages;
                console.log(JSON.stringify(data));
                console.log($scope.NoticeBoardData);
            })
            .error(function (data, success) {
            })




        //Exam Reports


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

                    $scope.getExamPapers($scope.data.examSchedule_name, $scope.secId);
                })
                .error(function (data, success) {
                })
        }




        $scope.getExamPapers = function (exSchedule, sectionId) {
            examServices.getExamPapersbySectionAndSchedule(exSchedule, sectionId)
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

        $scope.examData = [];
        $scope.getExamMarks = function (paperId) {
            var arrDataExam = new Array();
            var arrLabelsExam = new Array();
            $scope.examData = [];
            $scope.dataExam = [0];
            $scope.labelExam = [0];
            barChartOneService.getExamMarks(paperId)
                .success(function (data, status) {
                    $scope.examData = data.barchart;
                    console.log("mesage for exam");
                    console.log(JSON.stringify($scope.examData));



                    // $scope.chartdata1 = [30, 20, 40, 80, 50, 40, 30, 60];
                    // $scope.studata1 = ["stu1", "stu2", "stu3", "stu4", "stu5", "stu6", "stu7", "stu8"];
                    //console.log($scope.chartdata1);



                    $scope.array = $.map($scope.examData, function (item) {
                        //console.log([item.marks]);
                        //console.log([item.student_name]);
                        $scope.data2 = JSON.parse(item.marks);
                        arrDataExam.push($scope.data2);
                        arrLabelsExam.push(item.student_name);
                        $scope.dataExam = [];
                        $scope.labelExam = [];
                        $scope.maxMarks = item.max_marks;
                        console.log($scope.maxMarks);
                        //$scope.data1.push(arrData.trim(""));
                        //  for (var j = 0; j < arrData.length; i++) {
                        //     $scope.data1.push(arrData[i]);
                        // }
                        // $scope.data1.push(arrData);


                        for (var j = 0; j < arrDataExam.length; j++) {
                            $scope.dataExam.push(arrDataExam[j]);
                        }

                        // $scope.data1.push(arrData.slice(0));

                        if (arrLabelsExam != null) {
                            for (var i = 0; i < arrLabelsExam.length; i++) {
                                $scope.labelExam.push(arrLabelsExam[i]);
                            }
                        }
                        console.log($scope.dataExam);
                        console.log($scope.labelExam);
                        return [[item.marks, item.student_name]];
                        //, item.student_name
                    });

                    $scope.myJsonExam = {
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
                                    "values": "0:" + $scope.maxMarks,
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
                                    "values": $scope.labelExam,
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
                                        "values": $scope.dataExam,
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


        $scope.getGeolocation = function (vehicle_code) {
            var mapOptions = {
                zoom: 5,
                center: new google.maps.LatLng(17.745875, 83.314301),
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

            $scope.markers = [];
            var image = {
                url: 'dist/img/school_bus.png',

                scaledSize: new google.maps.Size(40, 40), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor

            };
            infowindow = new google.maps.InfoWindow();

            var createMarker = function (lat, lng, id, address) {

                var marker = new google.maps.Marker({
                    map: $scope.map,
                    position: new google.maps.LatLng(lat, lng),
                    animation: google.maps.Animation.DROP,
                    icon: image,
                    title: "Bus Id: " + id + ",   address: " + address

                });
                // marker.content = '<div class="infoWindowContent">' + infowindow.address + '</div>';
                google.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<h2>' + marker.title + '</h2>');
                    infowindow.open($scope.map, marker);
                });

                $scope.map.setZoom(18);
                $scope.map.panTo(marker.position);
                $scope.markers.push(marker);

            }


            console.log("message");

            routeGeoLocationServices.getGeolocation(vehicle_code)
                .success(function (data, status) {
                    $scope.status = status;
                    $scope.JSONdata = data;
                    console.log(JSON.stringify(data));
                    //for POST
                    $scope.locations = data;
                    $scope.latitude = data[0].latitude;
                    $scope.longitude = data[0].longitude;
                    $scope.id = data[0].deviceid;
                    $scope.address = data[0].address;
                    //for GET
                    // $scope.latitude = data[0].docPickUpAddress;
                    // $scope.longitude = data[0].avAddress;
                    //some google api data
                    //$scope.latitude=data.results[0].geometry.location.lat;
                    //$scope.longitude=data.results[0].geometry.location.lng;
                    console.log($scope.latitude);
                    console.log($scope.longitude);
                    createMarker($scope.latitude, $scope.longitude, $scope.id, $scope.address);
                })
                .error(function (data, success) {
                })
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            $scope.classId = $rootScope.student.class_id;
            $scope.vehicle_code = $rootScope.student.route_id;
            console.log($scope.classId);
            console.log($scope.vehicle_code);
            $scope.getTimeTable($scope.secId);
            if ($scope.initialLoadAttendence == false) {
                $scope.getAttendenceByDay($scope.select_date, $scope.classId, $scope.secId);
                // $scope.getAttendence($scope.select_date, $scope.classId, $scope.secId);
            }
            $scope.getExamSchedule();
            $scope.getExamPapers($scope.data.examSchedule_name, $scope.secId);

            $scope.getGeolocation($scope.vehicle_code);

            //$scope.populateSubjects($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
            $scope.getAllDevicesDetails();
        }


    }])
