angular.module('school_erp')
    .controller("addQuestionsController", ['$http', '$scope', '$rootScope', 'globalServices', 'questionsServices', 'subjectsServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, questionsServices, subjectsServices, ngDialog) {
        $scope.data = [];
        $scope.chapterId = '';


        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes;// Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId);
                   // $scope.addQuestions($scope.classId);

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

                })
                .error(function (data, success) {
                });
        }

       
        $scope.addQuestions = function (subId,data, classId) {
            //console.log($scope.chapterId + "lesson");
            var questionDetails = {
                question: $scope.data.question,
                subject_id: $scope.subId,
                answer: $scope.data.answer,
                option1: $scope.data.option1,
                option2: $scope.data.option2,
                option3: $scope.data.option3,
                option4: $scope.data.option4
            }
             $scope.classId=$scope.classId;
            questionsServices.setQuestions(questionDetails,  $scope.classId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Questions are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                   // $scope.getQuestions(classId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

          // Role based Display
          $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        //                  $scope.exportAction = function (option) {
        //     switch (option) {
        //         case 'pdf': $scope.$broadcast('export-pdf', {});
        //             break;
        //         case 'excel': $scope.$broadcast('export-excel', {});
        //             break;
        //         default: console.log('no event caught');
        //     }
        // }

        $scope.getClassesInitalLoad();
        // $scope.getQuestions($scope.classId);
    }])