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
          //  console.log(lessionId + "lesson");
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
                    if (data == false | data == 'false') {
                        ngDialog.open({
                            template: '<p style="color:red">Please fill all the fields </p>',
                            plain: true
                        });


                    } else {
                        ngDialog.open({
                            template: '<p>Questions are Added Successfully.</p>',
                            plain: true
                        });
                        $scope.data = [];
                        $scope.getQuestionsForSubject($scope.subId, $scope.classId, $scope.lessionId);

                    }

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

                    $scope.questions = [];
                    $scope.question = data.Questions;

                    index = 0;
                    $scope.question.forEach(function (element) {


                        element.options.forEach(function (element1) {
                            var obj = {
                                id: index++,
                                question_id: element.question_id,
                                class_id: element.class_id,
                                subject_id: element.subject_id,
                                lession_id: element.lession_id,
                                class_Name: element.class_Name,
                                subject_name: element.subject_name,
                                question: element.question,
                                answer: element.answer,
                                option_1: element1.option_1,
                                option_2: element1.option_2,
                                option_3: element1.option_3,
                                option_4: element1.option_4,
                            }
                            $scope.questions.push(obj);

                        })
                        // $scope.questions.push(obj);

                       // console.log($scope.questions);
                    })



                })
                .error(function (data, success) {
                });
        }

        $scope.DeleteQuestions = function (question_id, class_id, subject_id, lessionId) {

            questionsServices.DeleteQuestions(question_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Question is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getQuestionsForSubject(subject_id, class_id, lessionId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.editdata = angular.copy($scope.data[value]);
        $scope.EditQuestions = function (value, question) {

          //  console.log(value);
            $scope.question = angular.copy($scope.questions[value]);
            var QuestionsDetails = {
                question: question.question,

                answer: question.answer,
                option1: question.option_1,
                option2: question.option_2,
                option3: question.option_3,
                option4: question.option_4
            }
          //  console.log(QuestionsDetails);
            $scope.question_id =  $scope.question.question_id;
            $scope.class_id=$scope.question.class_id;
            $scope.subject_id=$scope.question.subject_id;
            $scope.lession_id=$scope.question.lession_id;
            //  console.log($scope.station_id);
            $scope.addEditQuestions(QuestionsDetails, $scope.question_id);
        }
        $scope.addEditQuestions = function (QuestionsDetails, question_id) {
            questionsServices.EditQuestions(QuestionsDetails, question_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getQuestionsForSubject($scope.subject_id, $scope.class_id, $scope.lession_id);
                    //  $scope.getQuestionsForSubject(subject_id, class_id, lessionId);
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




    }])