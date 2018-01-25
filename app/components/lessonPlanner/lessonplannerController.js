angular.module('school_erp')
    .controller("lessonPlannerController", ['$http', '$scope', 'chaptersServices', 'globalServices', 'subjectsServices', 'lessonplannerServices', 'ngDialog', '$rootScope', function ($http, $scope, chaptersServices, globalServices, subjectsServices, lessonplannerServices, ngDialog, $rootScope) {
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
                    // console.log($scope.secId);
                    $scope.populateSubjects($scope.secId);

                })
                .error(function (data, success) {

                    $scope.populateSubjects($scope.secId);
                })
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

                    $scope.subId = $scope.subData[0].subject_id;
                    // console.log($scope.subId )
                    $scope.getChapters($scope.subId);
                })
                .error(function (data, success) { });
        }



        $scope.getChapters = function (subId) {
            $scope.subId = subId;
            // console.log("uyhgvuyi");
            chaptersServices.getChapters(subId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data))
                    // console.log(subId)
                    // console.log($scope.subId);
                    $scope.chapters = data.chapters;
                    //console.log($scope.chapters);


                    $scope.chaptersData = [];
                    index = 0;
                    $scope.chapters.forEach(function (element) {

                        var obj = {
                            id: index++,
                            title: element.title,
                            chapter_id: element.lession_id,
                            chapter_code: element.chapter_code,
                            no_of_topics: element.no_of_topics,
                            completed_topics: element.completed_topics


                        }
                        $scope.chaptersData.push(obj);
                        //console.log($scope.chaptersData);
                    })


                })
                .error(function (data, success) { });
        }
        $scope.sendChapterHolder = [];

        $scope.addBulkChapter = function (subId) {
            //   console.log("message1");

            var dataB = $scope.chaptersData;
            var allowSubmission = false;
            var i = 0;


            angular.forEach($scope.chaptersData, function (value, key) {
                var dataObj = {
                    chapter_id: value.chapter_id,
                    //chapter_code: value.chapter_code,
                    //no_of_topics: value.no_of_topics,
                    completed_topics: value.completed_topics



                }
                $scope.sendChapterHolder.push(dataObj);
            })
            //   console.log("m3")
            console.log($scope.sendChapterHolder);



            lessonplannerServices.setBulkChapters($scope.sendChapterHolder, subId)
                .success(function (data, status) {

                    ngDialog.open({
                        template: '<p>Completed topics submited successfully.</p>',
                        plain: true
                    });

                    $scope.sendMarkseHolder = [];



                    $scope.getChapters($scope.subId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                    $scope.sendMarkseHolder = [];
                })


        }
        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
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
