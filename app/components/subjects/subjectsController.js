angular.module('school_erp')
    .controller("subjectsController", ['$http', '$scope', 'subjectsServices', 'ngDialog', 'globalServices', '$rootScope', function ($http, $scope, subjectsServices, ngDialog, globalServices, $rootScope) {
        $scope.subjectsData = [];
        $scope.data = [];
        //$scope.classData = [];
        //$scope.secId = '';
        //$scope.secData = [];
       // $scope.classId = '';

        $scope.getclassesInitialLoad = function () {
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
                    console.log(JSON.stringify(data));

                    $scope.secData = data.class_sections; // Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    console.log($scope.secId);
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) { })

        }

        // Get Subjects from Database for section
        $scope.getSubjects = function (secId) {
           $scope.secId=secId;
            subjectsServices.getSubjects(secId)
                .success(function (data, status) {
                    console.log(JSON.stringify(data));

                    $scope.subjectsData=data.subjects;
                    //$scope.subjectsData = data[secId + ""];
                   //console.log($scope.subjectsData);
                })
                .error(function (data, success) { });
        }

        $scope.addSubjects = function (data) {
            console.log("message");
            //  console.log($scope.secId);
            var Subjects = {
               
               // subject_id: $scope.data.subject_id,
              
                name: $scope.data.name
            }
            subjectsServices.setSubjects(Subjects, $scope.secId)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Subjects are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        };

        $scope.EditSubjects = function (value, subjects) {

            console.log("messsage");
            $scope.subjects = angular.copy($scope.subjectsData[value]);
            $scope.subject_id = $scope.subjects.subject_id;
            console.log($scope.subject_id);
            var SubjectsDetails = {
                name: $scope.subjects.name,
            }
            console.log(SubjectsDetails);

            $scope.addEditSubjects(SubjectsDetails, $scope.subject_id);
        }
        $scope.addEditSubjects = function (SubjectsDetails, subject_id) {
            subjectsServices.EditSubjects(SubjectsDetails, subject_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getSubjects($scope.secId);
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteSubjects = function (value) {
            $scope.editdata = angular.copy($scope.subjectsData[value]);
            $scope.subject_id = $scope.editdata.subject_id;
            console.log($scope.subject_id);
            subjectsServices.DeleteSubjects($scope.subject_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Subject is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getSubjects($scope.secId);
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

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                // console.log(file);
            })

        }

        $scope.handleFile = function (secId) {
            console.log("messsage2");
            console.log(secId);
            var file = $scope.selectedFile;
            console.log(file);
            $scope.save(file,secId);


            // if (file) {

            //     var reader = new FileReader();

            //     reader.onload = function (e) {

            //         var data = e.target.result;

            //         var workbook = XLSX.read(data, { type: 'binary' });

            //         var first_sheet_name = workbook.SheetNames[0];

            //         var dataObjects = XLSX.utils.sheet_to_json(workbook.Sheets[first_sheet_name]);

            //         //console.log(excelData);  

            //         if (dataObjects.length > 0) {


            //             $scope.save(dataObjects);


            //         } else {
            //             $scope.msg = "Error : Something Wrong1 !";
            //         }

            //     }

            //     reader.onerror = function (ex) {

            //     }

            //     reader.readAsBinaryString(file);
            // }
        }


        $scope.save = function (file,secId) {
            console.log("messsage3");
            console.log(file);

            var fd = new FormData();
            fd.append('file', file);
           // fd.append('data', 'string');
            $http.post(globalServices.globalValue.baseURL+'api/bulk_upload_subjects/'+secId, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function () {
                    ngDialog.open({
                        template: '<p>File Added Successfully.</p>',
                        plain: true
                    });

                })
                .error(function () {
                    ngDialog.open({
                        template: '<p>Some Error Occured!.</p>',
                        plain: true
                    });
                });
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



        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            $scope.getSubjects($scope.secId);


        } else {
            $scope.getclassesInitialLoad();
        }
    }])