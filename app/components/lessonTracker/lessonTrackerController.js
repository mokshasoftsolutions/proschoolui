angular.module('school_erp')
    .controller("lessonTrackerController", ['$http', '$scope', 'chaptersServices', 'globalServices', 'subjectsServices', 'lessonTackerServices', 'ngDialog', '$rootScope', function ($http, $scope, chaptersServices, globalServices, subjectsServices, lessonTackerServices, ngDialog, $rootScope) {
        $scope.chapterData = [];
        $scope.data = [];
        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes; // Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)

                })
                .error(function (data, success) { })

        }


        $scope.populateSections = function (classId) {
            $scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    $scope.getChapterResponse($scope.secId);
                    // console.log($scope.secId);
                   // $scope.populateSubjects($scope.secId);

                })
                .error(function (data, success) {

                    //$scope.populateSubjects($scope.secId);
                })
        }

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }




        $scope.getChapterResponse = function (secId) {
          //  $scope.subId = subId;
            // console.log("uyhgvuyi");
            lessonTackerServices.getChapterResponse(secId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data))
                    // console.log(subId)
                    // console.log($scope.subId);
                    $scope.subjects = data.subjects;
                    //console.log($scope.chapters);

                })
                .error(function (data, success) { });
        }
       

        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf':
                    $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel':
                    $scope.$broadcast('export-excel', {});
                    break;
                default:
                    console.log('no event caught');
            }
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section_id;
            $scope.populateSubjects($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
           
        }
    }])
