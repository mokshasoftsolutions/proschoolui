angular.module('school_erp')
    .controller("quizController", ['$http', '$scope', '$rootScope', 'globalServices', 'questionsServices', 'quizServices', 'subjectsServices', 'chaptersServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, questionsServices, quizServices, subjectsServices, chaptersServices, ngDialog) {
        $scope.data = [];
        $scope.chapterId = '';
        $scope.id = 0;

        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes;// Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)

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
                    //   console.log($scope.secId);
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
                    $scope.getQuestionsForSubject($scope.subId, $scope.classId);
                })
                .error(function (data, success) {
                });
        }

        // $scope.populateChapters = function (subId) {
        //     $scope.subId = subId;
        //     $scope.chapterData = [];
        //     chaptersServices.getChapters(subId)
        //         .success(function (data, status) {
        //             console.log(JSON.stringify(data));
        //             console.log(subId)
        //             $scope.chapterData = data[subId + ""];
        //             $scope.chapterId = $scope.chapterData[0].lession_id;
        //             console.log($scope.chapterId);
        //             $scope.getQuizQuestions($scope.secId, $scope.chapterId);
        //         })
        //         .error(function (data, success) {
        //         });
        // }

        $scope.getQuestionsForSubject = function (subId, classId) {

            questionsServices.getQuestionsForSubject(subId, classId)
                .success(function (data, status) {
                    //   console.log(JSON.stringify(data));


                    questions = data.Questions;

                    $scope.AllQus = [];
                    $scope.AllAns = [];
                    $scope.YourAns = [];
                    $scope.score = 0;
                })
                .error(function (data, success) {
                });
        }

        $scope.start = function () {
            //    console.log("start....");
            $scope.id = 0;
            $scope.quizOver = false;
            $scope.inProgress = true;
            $scope.getQuestion();
        };

        $scope.reset = function () {
            //   console.log("reset...");
            $scope.inProgress = false;
            $scope.score = 0;
        }
        $scope.getQuestion = function () {
            //     console.log("questions......")

            var q = $scope.getQuestions($scope.id);
            if (q) {
                $scope.question = q.question;
                $scope.options = q.options[0];
                $scope.answer = q.answer;
                $scope.answerMode = true;
            } else {
                $scope.quizOver = true;
            }
        }
        $scope.getQuestions = function (id) {
            //    console.log("questions for id......")
            //     console.log(questions);

            if (id < questions.length) {

                return questions[id];
            } else {
                return false;
            }
        }

        $scope.nextQuestion = function () {
            $scope.id++;
            $scope.getQuestion();
        }

        $scope.previousQuestion = function () {
            $scope.id--;
            $scope.getQuestion();
        }
        $scope.AllQus = [];
        $scope.AllAns = [];
        $scope.YourAns = [];
        $scope.checkAnswer = function () {
            //   console.log("answer....");
            if (!$('input[name=answer]:checked').length) return;

            var ans = $('input[name=answer]:checked').val();
            // var splited = ans.split(" ")
            // console.log(splited);
            //console.log($scope.answer);
            $scope.YourAns.push(ans);
            //  console.log($scope.answer);

            if (ans == $scope.answer) {
                console.log("increase score...");
                $scope.score++;
                $scope.AllQus.push($scope.question);
                $scope.AllAns.push($scope.answer);
                $scope.correctAns = true;
            } else {
                $scope.AllQus.push($scope.question)
                $scope.AllAns.push($scope.answer);
                $scope.correctAns = false;
            }

            $scope.answerMode = false;
        };
        //  console.log($scope.AllQus);
        //  console.log($scope.AllAns)
        //  console.log($scope.YourAns);
        // $scope.getQuizQuestions = function (classId) {

        //     quizServices.getQuizQuestions(classId)
        //         .success(function (data, status) {
        //             console.log(JSON.stringify(data));
        //             ngDialog.open({
        //                 // template: '<p>Questions are get Successfully.</p>',
        //                 plain: true
        //             });

        //             $scope.quizData = data.quiz;



        //         })
        //         .error(function (data, success) {
        //         });
        // }

        // $scope.addQuizQuestions = function (subId, data, classId) {

        //     var quizDetails = {

        //         question_id: $scope.question_id,
        //         submitted_answer: $scope.data.submitted_answer

        //     }
        //     $scope.classId = $scope.classId;
        //     quizServices.setQuizQuestions(quizDetails, $scope.classId)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Questions are Added Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.data = [];
        //             $scope.getQuizQuestions(classId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }


        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section_id;
            $scope.classId = $rootScope.student.class_id;
            $scope.populateSubjects($scope.secId);
            $scope.reset();
            // subjectsServices.getSubjects($scope.secId)
            // .success(function (data, status) {
            //     $scope.subData = data.subjects;
            //     $scope.subId = $scope.subData[0].subject_id;
            //     $scope.getQuestions($scope.subId,$scope.classId);
            // })
            // .error(function (data, success) {
            // });


        } else {
            $scope.getClassesInitalLoad();
        }

    }])