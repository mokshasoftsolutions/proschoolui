angular.module('school_erp')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        // $httpProvider.responseInterceptors.push(function ($q, $rootScope) {

        //     return function (promise) {
        //         $rootScope.$broadcast("event:startProgress");
        //         return promise
        //             .then(
        //             function (response) {
        //                 $rootScope.$broadcast("event:endProgress");
        //                 return response;
        //             },
        //             function (response) { //on error
        //                 $rootScope.$broadcast("event:endProgress");
        //                 return $q.reject(response);
        //             }
        //             )

        //     }
        // })

        // ChartJsProvider
        // ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
        $stateProvider
            // .state('login', { // login Page
            //     url: "/login",
            //     templateUrl: "app/components/login/login.html",
            //     controller: "loginController",
            //     data: {
            //         requireLogin: false
            //     }
            // })
            .state('main', {
                url: "/",
                views: {
                    '': { templateUrl: "app/components/shared/main.html" },
                    'header@main': { templateUrl: "app/components/shared/header.html", controller: 'headController' },
                    'sidebar@main': { templateUrl: "app/components/shared/sidebar.html", controller: 'sideController' },
                    'footer@main': { templateUrl: "app/components/shared/footer.html" }
                },
                data: {
                    requireLogin: true
                }
            })
            .state('main.dashboard', { // login Page
                url: "dashboard",
                templateUrl: "app/components/dashboard/dashboard.html",
                controller: "dashboardController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.addClass&Section', { // login Page
                url: "addClass&Section",
                templateUrl: "app/components/addClass&Section/addClass&Section.html",
                controller: "addClassSectionController",
                data: {
                    requireLogin: true
                }

            })

            .state('main.parentInfo', { // login Page
                url: "parentInformation",
                templateUrl: "app/components/parentInformation/parentInformation.html",
                controller: "parentInformationController",
                data: {
                    requireLogin: true
                }

            })


            .state('main.teacherInfo', { // login Page
                url: "teacherInformation",
                templateUrl: "app/components/teacherInformation/teacherInformation.html",
                controller: "teacherInformationController",
                data: {
                    requireLogin: true
                }

            })

            // .state('main.parentDashboard', { // login Page
            //     url: "dashboard",
            //     templateUrl: "app/components/parentDashboard/parentDashboard.html",
            //     controller: "parentDashboardController",
            //     data: {
            //         requireLogin: true
            //     }
            // })
            .state('main.studentProfile', { // login Page
                url: "student/studentProfile/:student",
                templateUrl: "app/components/studentProfile/studentProfile.html",
                controller: "studentProfileController",
                data: {
                    requireLogin: true
                }

            })
            .state('main.studentAdmission', { // login Page
                url: "studentInfo/studentAdmission",
                templateUrl: "app/components/studentAdmission/studentAdmission.html",
                controller: "studentAdmissionController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.student', { // login Page
                url: "studentInfo/student",
                templateUrl: "app/components/student/student.html",
                controller: "studentController",
                data: {
                    requireLogin: true
                }
                // views:{
                //     '':{templateUrl:"app/components/student/studentProfile/studentProfile.html"}
                // }
            })
            // .state('main.studentDetails', { // login Page
            //     url: "studentInfo/studentDetails",
            //     templateUrl: "app/components/studentDetails/studentDetails.html"          
            // })
            .state('main.employee', { // login Page
                url: "employeeInfo/employee",
                templateUrl: "app/components/employee/employee.html",
                controller: "employeeController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.employeeDetails', { // login Page
                url: "employeeInfo/employeeDetails",
                templateUrl: "app/components/employeeDetails/employeeDetails.html",
                controller: "employeeDetailsController",
                data: {
                    requireLogin: true
                }
            })


            .state('main.studentAttendance', { // login Page
                url: "attendance/studentAttendance",
                templateUrl: "app/components/studentAttendance/studentAttendance.html",
                controller: "studentAttendanceController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.attendenceListStudent', { // login Page
                url: "attendance/attendenceListStudent",
                templateUrl: "app/components/attendenceListStudent/attendenceList.html",
                controller: "attendanceListController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.attendenceReportStudent', { // login Page
                url: "attendance/attendenceReportStudent",
                templateUrl: "app/components/attendenceReportStudent/attendenceReport.html",
                controller: "attendanceReportController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.employeeAttendance', { // login Page
                url: "employeeInfo/employeeAttendance",
                templateUrl: "app/components/employeeAttendance/employeeAttendance.html",
                controller: "employeeAttendanceController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.attendenceListEmployee', { // login Page
                url: "attendance/attendenceListEmployee",
                templateUrl: "app/components/attendenceListEmployee/attendenceListEmployee.html",
                controller: "attendanceListEmployeeController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.attendenceReportEmployee', { // login Page
                url: "attendance/attendenceReportEmployee",
                templateUrl: "app/components/attendenceReportEmployee/attendenceReport.html",
                controller: "attendanceReportEmployeeController",
                data: {
                    requireLogin: true
                }
            })

            // .state('main.attendenceReports2', { // login Page
            //     url: "attendance/attendenceReports/Report2",
            //     templateUrl: "app/components/attendenceReports/Report2/report2.html",
            //     controller: "reportTwoController",
            //     data: {
            //         requireLogin: true
            //     }
            // })


            .state('main.subjects', { // login Page
                url: "academics/subjects",
                templateUrl: "app/components/subjects/subjects.html",
                controller: "subjectsController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.chapters', { // login Page
                url: "academics/chapters",
                templateUrl: "app/components/chapters/chapters.html",
                controller: "chaptersController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.assignSubjects', { // login Page
                url: "academics/assignSubjects",
                templateUrl: "app/components/assignSubjects/assignSubjects.html",
                controller: "assignSbjectsController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.assignments', { // login Page
                url: "academics/assignments",
                templateUrl: "app/components/assignments/Assignments.html",
                controller: "assignmentsController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.examSchedules', { // login Page
                url: "examination/examSchedules",
                templateUrl: "app/components/examSchedules/examSchedules.html",
                controller: "examSchedulesController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.examPapers', { // login Page
                url: "examination/examPapers",
                templateUrl: "app/components/examPapers/examPapers.html",
                controller: "examPapersController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.evaluations', { // login Page
                url: "examination/evaluations",
                templateUrl: "app/components/evaluations/evaluations.html",
                controller: "evaluationsController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.examReports1', { // login Page
                url: "examination/examReports/barChart1",
                templateUrl: "app/components/examReports/barChart1/barChart1.html",
                controller: "barChartOneController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.examReports2', { // login Page
                url: "examination/examReports/barChart2",
                templateUrl: "app/components/examReports/barChart2/barChart2.html",
                controller: "barChartTwoController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.classWise', { // login Page
                url: "timetable/classWise",
                templateUrl: "app/components/classWise/classWise.html",
                controller: "classWiseController",
                data: {
                    requireLogin: true
                }
            })
            // .state('main.teacherWise', { // login Page
            //     url: "timetable/teacherWise",
            //     templateUrl: "app/components/teacherWise/teacherWise.html",

            //     data: {
            //         requireLogin: true
            //     }
            // })
            .state('main.schoolEvents', { // login Page
                url: "timetable/schoolEvents",
                templateUrl: "app/components/schoolEvents/schoolEvents.html",
                controller: "schoolEventsController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.onlineNoticeBoard', { // login Page
                url: "timetable/onlineNoticeBoard",
                templateUrl: "app/components/onlineNoticeBoard/onlineNoticeBoard.html",
                controller: "noticeboardController",
                data: {
                    requireLogin: true
                }
            })
            // .state('main.libraryRules', { // login Page
            //     url: "library/libraryRules",
            //     templateUrl: "app/components/libraryRules/libraryRules.html",
            //     data: {
            //         requireLogin: true
            //     }
            // })
            .state('main.feeType', { // login Page
                url: "fee/feeType",
                templateUrl: "app/components/feeType/feeType.html",
                controller: "feeTypeController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.feeMaster', { // login Page
                url: "fee/feeMaster",
                templateUrl: "app/components/feeMaster/feeMaster.html",
                controller: "feeMasterController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.collectFee', { // login Page
                url: "fee/collectFee",
                templateUrl: "app/components/collectFee/collectFee.html",
                controller: "collectFeeController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.collectFee2', { // login Page
                url: "fee/collectFee2",
                templateUrl: "app/components/collectFee2/collectFee2.html",
                controller: "collectFee2Controller",
                data: {
                    requireLogin: true
                }
            })


            .state('main.addBook', { // login Page
                url: "library/addBook",
                templateUrl: "app/components/addBook/addBook.html",
                controller: "addBookController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.bookList', { // login Page
                url: "library/bookList",
                templateUrl: "app/components/bookList/bookList.html",
                controller: "bookListController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.addStation', { // login Page
                url: "transport/addStation",
                templateUrl: "app/components/addStation/addStation.html",
                controller: "addStationController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.addBusRoute', { // login Page
                url: "transport/addBusRoute",
                templateUrl: "app/components/addBusRoute/addBusRoute.html",
                controller: "BusRouteController",
                data: {
                    requireLogin: true
                }
            })
            .state('main.routeGeolocation', { // login Page
                url: "transport/routeGeolocation",
                templateUrl: "app/components/routeGeolocation/routeGeolocation.html",
                controller: "routeGeoLocationController",
                data: {
                    requireLogin: true
                }
            })

            .state('main.addVehicle', {
                url: "transport/addVehicle",
                templateUrl: "app/components/addVehicle/addVehicle.html",
                controller: "addVehicleController",
                data: {
                    requireLogin: true
                }
            })
            .state('first_page', { // login Page
                url: "/first_page",
                templateUrl: "app/components/first_page/firstPage.html",
                data: {
                    requireLogin: false
                }
            })
            .state('login_page', { // login Page

                url: "/login_page",
                templateUrl: "app/components/login_page/loginPage.html",
                controller: "loginController",
                data: {
                    requireLogin: false
                }
            })
            .state('registration_page', { // login Page

                url: "/registration_page",
                templateUrl: "app/components/registration/register.html",
                controller: "registrationController",
                data: {
                    requireLogin: false
                }
            });
        $urlRouterProvider.otherwise("/login_page");

    })
//     .service("progress", ["$rootScope", "ngProgress", function($rootScope, ngProgress){
//     $rootScope.$on("event:endProgress", function(){
//       console.log("End progress");
//       ngProgress.complete();
//     // ngProgress.reset();
//     });
//     $rootScope.$on("event:startProgress", function(){
//       console.log("Start progress");
//       ngProgress.reset();
//       ngProgress.start();
//     })
//   }])