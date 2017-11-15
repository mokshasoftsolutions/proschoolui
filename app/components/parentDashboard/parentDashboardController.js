angular.module('school_erp')
    .controller("parentDashboardController", ['$http', '$scope', '$compile', 'chaptersServices', 'globalServices', 'subjectsServices', 'classWiseServices', 'NoticeBoardServices', 'schoolEventsServices', 'addVehicleServices', 'barChartOneService', 'ngDialog', '$rootScope', function ($http, $scope, $compile, chaptersServices, globalServices, subjectsServices, classWiseServices, NoticeBoardServices, schoolEventsServices, addVehicleServices, barChartOneService, ngDialog, $rootScope) {
      
        $scope.data = [];
        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            $scope.secId = [];
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
                    // $scope.subId = $scope.subData[0].subject_id;
                    $scope.subId = data.subjects[0].subject_id;
                    //$scope.getChapters($scope.subId);
                    $scope.getTimeTable($scope.subId);
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
                                } else if (valuesub.day == "thursday") {
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
                    // $scope.studentId = $scope.students[0].student_id;
                    //console.log($scope.studentId);
                })
                .error(function (data, success) {
                })
        }

        // Attendence Reports

        var arrData = new Array();
        var arrLabels = new Array();
        $scope.examData = [];
        $scope.data1 = [0];
        $scope.label1 = [0];


        // static paperId
        var paperId = "SCH-9271-EXM_SCH-2-EXM-17"

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

                $scope.myJson1 = {
                    "graphset": [
                        {
                            "type": "bar",
                            "background-color": "white",
                            "title": {
                                "text": "Exam Report",
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
                                "values": $scope.studata1,

                                // $scope.label1,
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
                                    "values": $scope.chartdata1,
                                    //$scope.data1,
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



        //Buses
        addVehicleServices.getVehicle()
            .success(function (data, status) {
                $scope.vehicles = data.vehicles;
                console.log(JSON.stringify(data))
            })
            .error(function (data, success) {
            });

        //Route GeoLocation


        var mapOptions = {
            zoom: 5,
            center: new google.maps.LatLng(17.745875, 83.314301),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        $scope.markers = [];
        var image = {
            url: 'school_bus.png',

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
        //some google api
        //$http({ method: 'GET', url: "http://maps.google.com/maps/api/geocode/json?address=Canada&sensor=true&region=USA" }).
        //traccar api's
        //$http({ method: 'GET', url: "http://192.168.1.13:3000/api/users" }).
        $http.post("http://192.168.1.11:2016/netcomp/getDeviceCodeDetails", { deviceCode: $scope.code }, { headers: { 'Content-type': 'application/json' } }).

            success(function (data, status) {
                $scope.status = status;
                $scope.JSONdata = data;
                console.log(JSON.stringify(data));
                //for POST
                $scope.latitude = data.positions.latitude;
                $scope.longitude = data.positions.longitude;
                $scope.id = data.positions.deviceId;
                $scope.address = data.positions.address;
                //for GET
                // $scope.latitude = data[0].docPickUpAddress;
                // $scope.longitude = data[0].avAddress;
                //some google api data
                //$scope.latitude=data.results[0].geometry.location.lat;
                //$scope.longitude=data.results[0].geometry.location.lng;
                console.log($scope.latitude);
                console.log($scope.longitude);
                createMarker($scope.latitude, $scope.longitude, $scope.id, $scope.address);
                //createInfoWindow($scope.id, $scope.address);
            }).
            error(function (data, status) {
                $scope.JSONdata = data || "Request failed";
                $scope.status = status;
                console.log($scope.data + $scope.status);
            });

        // Online Notice Board

        NoticeBoardServices.getNoticeBoard()
            .success(function (data, status) {
                $scope.NoticeBoardData = data.messages;
                console.log(JSON.stringify(data));
                console.log($scope.NoticeBoardData);
            })
            .error(function (data, success) {
            })

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






        $scope.chartdata = [[70], [20], [10]];
        $scope.chartdata1 = [[30], [50], [20]];
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
            series: [
                {
                    //  values : [50],
                    text: "present"
                },
                {
                    // values : [35],
                    text: "absent"
                },
                {
                    //  values : [20],
                    text: "leave"
                }
            ]
        };
    }])
