angular.module('school_erp')
    .controller("schoolEventsController", ['$http', '$scope', '$rootScope', '$compile', 'uiCalendarConfig', 'schoolEventsServices', 'ngDialog','globalServices', function ($http, $scope, $rootScope, $compile, uiCalendarConfig, schoolEventsServices, ngDialog,globalServices) {
        

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
        /* add custom event*/
        $scope.addEvent = function (data) {
            console.log($scope.eventsData);
            //  $rootScope.events.push({
            //     title: 'Open Sesame',
            //     start: new Date(y, m, 12),
            //     end: new Date(y, m, 13),
            //     className: ['openSesame']
            // });

            var EventDetails = {
                event_title: $scope.data.event_name,
                date: $scope.data.date,
                time: $scope.data.time,
                description: $scope.data.description
            }


                  

            schoolEventsServices.setEvents(EventDetails)
                .success(function (successdata, status) {
                    ngDialog.open({
                        template: '<p>SchoolEvents are added Successfully.</p>',
                        plain: true
                    });
                  
                    $scope.data = {};
                    //$scope. = [];
                    $scope.getEvent();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })



            // $scope.events.push({
            //     title: 'Open Sesame',
            //     start: new Date(y, m, 28),
            //     end: new Date(y, m, 29),
            //     className: ['openSesame']
            // });
        };

        $scope.getEvent = function () {

            schoolEventsServices.getEvents()
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // $scope.eventData = data.school_events;

                    angular.forEach(data.school_events, function(value, key) {
                 
                        
                            $scope.eventsData.push({
                                            title:value.event_title,
                                            start:new Date(value.date),
                                            end: new Date(value.date),
                                            className: value.description,
                                            allDay: false
                                        });


                    })

 



                })
                .error(function (data, success) {
                })


        };
        // $rootScope.events = [
        //     // { title: 'All Day Event', start: new Date(y, m, 1) },
        //     // { title: 'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2) },
        //     // { id: 999, title: 'Repeating Event', start: new Date(y, m, d - 3, 16, 0), allDay: false },
        //     // { id: 999, title: 'Repeating Event', start: new Date(y, m, d + 4, 16, 0), allDay: false },
        //     // { title: 'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false },
        //     // { title: 'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/' }
        // ];

        // $scope.data1 = [];
        // for (var i = 0; i < $rootScope.events.length; i++) {
        //     $scope.data1.push($rootScope.events[i]);
        // }
        // console.log($scope.data1);

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
        $scope.eventSources2 = [$scope.eventsF,$scope.eventsData];


         // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        } 

        $scope.getEvent();

    }])

