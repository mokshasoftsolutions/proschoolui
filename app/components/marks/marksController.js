angular.module('school_erp')
    .controller("marksController", ['$http', '$scope', '$rootScope', 'globalServices', 'subjectsServices','chaptersServices','studentServices' , 'assignmentsServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, subjectsServices,chaptersServices,  studentServices, assignmentsServices, ngDialog) {
        $scope.data = [];
        $scope.chapterId = '';


        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes;// Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)
                    console.log(JSON.stringify(data));

                })
                .error(function (data, success) {
                })
        }



        $scope.populateSections = function (classId) {
            $scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                   // console.log($scope.secId);
                    $scope.populateSubjects($scope.secId);
                    $scope.getStudentValue($scope.secId);

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
                    $scope.subId = $scope.subData[0].subject_id;
                    $scope.populateChapters($scope.subId);

                })
                .error(function (data, success) {
                });
        }

        $scope.populateChapters = function (subId) {
            $scope.subId = subId;
            $scope.chapterData = [];
            chaptersServices.getChapters(subId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));
                 //   console.log(subId)
                    $scope.chapterData = data[subId + ""];
                    $scope.chapterId = $scope.chapterData[0].lession_id;
                    // console.log($scope.chapterId);
                    $scope.getAssignments($scope.secId, $scope.chapterId);
                })
                .error(function (data, success) {
                });
        }

        $scope.getStudentValue = function (secId) {
            studentServices.getStudent(secId)
                .success(function (data, status) {
                    $scope.studentData = data.students;
                    console.log(JSON.stringify(data));
                })
                .error(function (data,success) {
                })
        }

        $scope.getAssignments = function (secId, chapterId) {
            //$scope.chapterId = chapterId;
            console.log(secId);
          //  console.log(chapterId);
            assignmentsServices.getAssignments(secId, chapterId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));

                    $scope.assignmentsData = data.assignments;

                    // console.log($scope.assignmentsData);

                })
                .error(function (data, success) {
                });
        }
        $scope.getClassesInitalLoad();


    }])

















