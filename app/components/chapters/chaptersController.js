angular.module('school_erp')
    .controller("chaptersController", ['$http', '$scope', 'chaptersServices', 'globalServices', 'subjectsServices', 'ngDialog','$rootScope', function ($http, $scope, chaptersServices, globalServices, subjectsServices, ngDialog,$rootScope) {
        $scope.chapterData = [];
        $scope.data = [];
        $scope.getClassesInitalLoad = function () {
            globalServices.getClass()
                .success(function (data, status) {
                    $scope.classData = data.school_classes; // Api list-name
                    $scope.classId = $scope.classData[0].class_id;
                    $scope.populateSections($scope.classId)

                })
                .error(function (data, success) {})

        }


        $scope.populateSections = function (classId) {
            $scope.secData = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    console.log($scope.secId);
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
                .error(function (data, success) {});
        }



        $scope.getChapters = function (subId) {
            $scope.subId = subId;
            chaptersServices.getChapters(subId)
                .success(function (data, status) {
                     console.log(JSON.stringify(data))
                    // console.log(subId)
                    // console.log($scope.subId);
                    $scope.chaptersData = data[subId + ""];
                    console.log($scope.chaptersData);
                   

                })
                .error(function (data, success) {});
        }


        $scope.addChapters = function (data) {
            var chapterDetails = {
                title: $scope.data.title,
                chapter_code: $scope.data.chapter_code,
                no_of_topics: $scope.data.no_of_topics,
                description: $scope.data.description
            }
            // console.log(chapterDetails);
            // console.log($scope.subId);
            chaptersServices.setChapters(chapterDetails, $scope.subId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Chapters are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getChapters($scope.subId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.EditChapters = function (value, chapter) {

            // console.log("messsage");
            $scope.chapter = angular.copy($scope.chaptersData[value]);
            // console.log($scope.chapter);
             $scope.chapter_id = $scope.chapter.lession_id;
            // console.log($scope.chapter_id);
            var ChapterDetails = {
                title: $scope.chapter.title,
                chapter_code: $scope.chapter.chapter_code,
               // subject_name: $scope.chapter.subject_name,
                description: $scope.chapter.description,
                no_of_topics: $scope.chapter.no_of_topics,
            }
            // console.log(ChapterDetails);
           
            $scope.addEditChapters(ChapterDetails ,$scope.chapter_id);
        }
        $scope.addEditChapters = function (ChapterDetails ,chapter_id) {
            chaptersServices.EditChapters(ChapterDetails ,chapter_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getChapters($scope.subId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteChapters = function (value) {
            $scope.editdata = angular.copy($scope.chaptersData[value]);
            $scope.chapter_id = $scope.editdata.lession_id;
            // console.log($scope.chapter_id);
            chaptersServices.DeleteChapters($scope.chapter_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Chapter is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                     $scope.getChapters($scope.subId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }


        $scope.selectedFile = null;
        $scope.msg = "";


        $scope.loadFile = function (files) {

            $scope.$apply(function () {

                $scope.selectedFile = files[0];

            })

        }

        $scope.handleFile = function () {

            var file = $scope.selectedFile;

            if (file) {

                var reader = new FileReader();

                reader.onload = function (e) {

                    var data = e.target.result;

                    var workbook = XLSX.read(data, {
                        type: 'binary'
                    });

                    var first_sheet_name = workbook.SheetNames[0];

                    var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

                    //console.log(excelData);  

                    if (dataObjects.length > 0) {


                        $scope.save(dataObjects);


                    } else {
                        $scope.msg = "Error : Something Wrong1 !";
                    }

                }

                reader.onerror = function (ex) {

                }

                reader.readAsBinaryString(file);
            }
        }


        $scope.save = function (data) {
            // console.log(JSON.stringify(data));

            $http({
                method: "POST",
                url: "globalServices.globalValue.baseURL + 'api/book/SCH-9271'",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            }).then(function (data) {
                if (data.status) {
                    $scope.msg = "Data has been inserted ! ";
                } else {
                    $scope.msg = "Error : Something Wrong2";
                }
            }, function (error) {
                $scope.msg = "Error : Something Wrong3";
            })

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

            $scope.secId = $rootScope.student.section;
            $scope.populateSubjects($scope.secId);
          

        } else {
            $scope.getClassesInitalLoad();
        }
    }])
