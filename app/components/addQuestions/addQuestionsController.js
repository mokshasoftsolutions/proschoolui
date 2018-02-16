angular.module('school_erp')
    .controller("addQuestionsController", ['$http', '$scope', '$rootScope', 'globalServices', 'questionsServices', 'subjectsServices', 'chaptersServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, questionsServices, subjectsServices, chaptersServices, ngDialog) {
       // $scope.data = [];
      //  $scope.chapterId = '';



        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId);
                // $scope.addQuestions($scope.classId);

            })
            .error(function (data, success) {
            })




        $scope.populateSections = function (classId) {
            //$scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    // console.log($scope.secId);
                    $scope.populateSubjects($scope.secId);


                })
                .error(function (data, success) {

                   // $scope.populateSubjects($scope.secId);
                })
        }

        $scope.populateSubjects = function (secId) {
           // $scope.subData = [];
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    $scope.subData = data.subjects;
                    $scope.subId = $scope.subData[0].subject_id;
                    $scope.populateChapters($scope.subId);

                })
                .error(function (data, success) {
                   // $scope.populateChapters($scope.subId);

                    //$scope.getQuestionsForSubject($scope.subId, $scope.classId);
                });
        }
        $scope.populateChapters = function (subId) {
          
            chaptersServices.getChapters(subId)
                .success(function (data, status) {
                  
                    $scope.chaptersData = data.chapters;
                    $scope.chapterId = $scope.chaptersData[0].lession_id;
                    //console.log($scope.chapterId);

                    $scope.getQuestionsForSubject($scope.subId, $scope.classId, $scope.chapterId);
                })
                .error(function (data, success) {
                    //   $scope.getQuestionsForSubject($scope.subId, $scope.classId, $scope.chapterId);
                    //  $scope.populateSubjects($scope.secId);
                });
        };



        $scope.addQuestions = function (subId, data, classId, lessionId) {
            console.log(lessionId + "lesson");
            var questionDetails = {
                question: $scope.data.question,
                subject_id: subId,
                lession_id: lessionId,
                answer: $scope.data.answer,
                option1: $scope.data.option1,
                option2: $scope.data.option2,
                option3: $scope.data.option3,
                option4: $scope.data.option4
            }
            $scope.classId = $scope.classId;
            $scope.lessionId = lessionId;
            questionsServices.setQuestions(questionDetails, $scope.classId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Questions are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getQuestionsForSubject($scope.subId, $scope.classId, $scope.lessionId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.getQuestionsForSubject = function (subId, classId, lessionId) {

            questionsServices.getQuestionsForSubject(subId, classId, lessionId)
                .success(function (data, status) {
                    //   console.log(JSON.stringify(data));


                    $scope.questions = data.Questions;


                })
                .error(function (data, success) {
                });
        }

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }




    }])