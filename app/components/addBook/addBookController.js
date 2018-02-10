angular.module('school_erp')
    .controller("addBookController", ['$http', '$scope', 'addBookServices', 'ngDialog', 'globalServices', 'subjectsServices', function ($http, $scope, addBookServices, ngDialog, globalServices, subjectsServices) {
        $scope.data = [];
        $scope.today1 = '01/01/2000';

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            $scope.secId = [];
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
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
                    // $scope.getChapters($scope.subId);
                })
                .error(function (data, success) {
                });
        }

        $scope.addBook = function (data) {
            var bookDetails = {
                book_title: $scope.data.book_title,
                author_name: $scope.data.author_name,
                book_price: $scope.data.book_price,
                qty: $scope.data.qty,
                rack_number: $scope.data.rack_number,
                inward_date: $scope.data.inward_date,
                book_description: $scope.data.book_description,
                subject: $scope.data.subject
            }
            addBookServices.setBook(bookDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Books are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getBook();
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

        $scope.handleFile = function () {
            console.log("messsage2");
            var file = $scope.selectedFile;
            console.log(file);
            $scope.save(file);


        }


        $scope.save = function (file) {
            console.log("messsage3");
            console.log(file);

            var fd = new FormData();
            fd.append('file', file);
           // fd.append('data', 'string');
            $http.post(globalServices.globalValue.baseURL+'api/upload_books/'+globalServices.globalValue.school_id, fd, {
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
           

// Role based Display
$scope.showRole = function (role) {
    return globalServices.fetchRoleAuth(role);
}




        }])



