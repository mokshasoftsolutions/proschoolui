angular.module('school_erp')
    .controller("bookListController", ['$http', '$scope', '$rootScope', 'globalServices', 'subjectsServices', 'addBookServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, subjectsServices, addBookServices, ngDialog) {
        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel': $scope.$broadcast('export-excel', {});
                    break;
                default: console.log('no event caught');
            }
        }
        //$scope.hideForm = false;


        $scope.data = [];
        addBookServices.getBook()
            .success(function (data, status) {

                $scope.data = data.books;
                console.log(JSON.stringify(data));

                
            })
            .error(function (data, success) {
            })

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

        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }


        $scope.EditBook = function (value,books) {

            console.log("messsage");
            $scope.books = angular.copy($scope.data[value]);
            var BooksDetails = {
               book_title: $scope.books.book_title,
                author_name: $scope.books.author_name,
                book_price: $scope.books.book_price,
                qty: $scope.books.qty,
                rack_number: $scope.books.rack_number,
                inward_date: $scope.books.inward_date,
                book_description: $scope.books.book_description,
                subject: $scope.books.subject
            }
            console.log(BooksDetails);
            $scope.book_id = $scope.books.book_id;
            console.log($scope.book_id);
            $scope.addEditBook(BooksDetails ,$scope.book_id);
        }
        //  var StationDetails = {
        //     station_name:$scope.data.station_name,
        //     station_code:$scope.data.station_code,
        //     station_geo_location:$scope.data.station_geo_location
        //  }
        $scope.addEditBook = function (BooksDetails ,book_id) {
            addBookServices.EditBook(BooksDetails, book_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    addBookServices.getBook()
            .success(function (data, status) {

                $scope.data = data.books;
            })
            .error(function (data, success) {
            })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteBook = function (value) {
            $scope.editdata = angular.copy($scope.data[value]);
            $scope.book_id = $scope.editdata.book_id;
            console.log($scope.book_id);
            addBookServices.DeleteBook($scope.book_id)
                .success(function (data, status) {
                    //ngDialog.open({
                    //    template: '<p>Book is Deleted Successfully.</p>',
                    //    plain: true
                    // });
                    $scope.editdata = [];
                   addBookServices.getBook()
            .success(function (data, status) {

                $scope.data = data.books;
            })
            .error(function (data, success) {
            })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }
        //$scope.divEmployee = false;

        //     $scope.EditBook = function (books) {
        //         console.log(books);
        //         //debugger;
        //         var getData = addBookServices.getEmployee(employee.Id);
        //         getData.then(function (emp) {
        //             $scope.employee = emp.data;
        //             $scope.employeeId = employee.Id;
        //             $scope.employeeName = employee.name;
        //             $scope.employeeEmail = employee.email;
        //             $scope.employeeAge = employee.Age;
        //             $scope.Action = "Update";
        //             $scope.divEmployee = true;
        //         },
        //             function () {
        //                 alert('Error in getting records');
        //             });
        //     }

        //     $scope.AddUpdateEmployee = function ()
        // {
        //     debugger;
        //     var Employee = {
        //         Name: $scope.employeeName,
        //         Email: $scope.employeeEmail,
        //         Age: $scope.employeeAge
        //     };
        //     var getAction = $scope.Action;

        //     if (getAction == "Update") {
        //         Employee.Id = $scope.employeeId;
        //         var getData = addBookServices.updateEmp(Employee);
        //         getData.then(function (msg) {
        //             GetAllEmployee();
        //             alert(msg.data);
        //             $scope.divEmployee = false;
        //         }, function () {
        //             alert('Error in updating record');
        //         });
        //     } else {
        //         var getData = myService.AddEmp(Employee);
        //         getData.then(function (msg) {
        //             GetAllEmployee();
        //             alert(msg.data);
        //             $scope.divEmployee = false;
        //         }, function () {
        //             alert('Error in adding record');
        //         });
        //     }
        // }

        if ($rootScope.role == 'parent') {

            $scope.secId = $rootScope.student.section;
            $scope.populateSubjects($scope.secId);


        } else {
            $scope.getClassesInitalLoad();
        }


    }])


