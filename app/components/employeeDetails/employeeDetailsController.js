angular.module('school_erp')
    .controller("employeeDetailsController", ['$http', '$scope', '$timeout', 'globalServices', 'employeeServices', 'ngDialog', function ($http, $scope, $timeout, globalServices, employeeServices, ngDialog) {
        $scope.employeeDetailsData = [];
        $scope.data = [];
        $scope.today1 = '01/01/1975';

        $scope.selectedFile = null;

        $scope.loadImage = function (files) {

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                console.log($scope.selectedFile);

                if ($scope.selectedFile.type != "image/jpeg" && $scope.selectedFile.type != "image/png") {
                    //     ngDialog.open({
                    //         template: '<p> Not a Image File </p>',
                    //         plain: true
                    //     });
                    //    $window.alert("Not a Image File");
                    $scope.message = "Not a Image File !..";
                }


            })

        }

        $scope.addEmployee = function (data) {

            console.log("messsage2");
            var file = $scope.selectedFile;
            //console.log(file);
            $scope.saveImage(file, data);
            // var empDetails = {
            //     first_name: $scope.data.first_name,
            //     last_name: $scope.data.last_name,
            //     dob: $scope.data.dob,
            //     job_category: $scope.data.jobType,
            //     experience: $scope.data.experience,
            //     phone: $scope.data.phone,
            //     email: $scope.data.email,
            //     profile_image: "imageData",
            //     website: $scope.data.website,
            //     joined_on: $scope.data.joined_on,
            //     gender: $scope.data.gender,
            //    // experience: $scope.data.experience,
            //    // website: $scope.data.website,
            //     qualification: $scope.data.qualification
            // }
        }
        //     employeeServices.setEmployee(empDetails)
        //         .success(function (data, status) {
        //             $timeout(function () {
        //                 ngDialog.open({
        //                     template: '<p>Employeee Added Successfully.</p>',
        //                     plain: true
        //                 });
        //             }, 300);
        //             $scope.data = [];
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }


        $scope.saveImage = function (file, data) {

            // console.log(stdAdmission);
            // console.log("messsage3");
            // console.log(file);

            var fd = new FormData();
            fd.append('file', file);
            
            fd.append('first_name', $scope.data.first_name);
            fd.append('last_name', $scope.data.last_name);
            fd.append('gender', $scope.data.gender);
            fd.append('dob', $scope.data.dob);
            fd.append('job_category',$scope.data.jobType);
            fd.append('experience', $scope.data.experience);
            fd.append('phone', $scope.data.phone);
            fd.append('email', $scope.data.email);
            fd.append('profile_image', $scope.data. profile_image);
            fd.append('website', $scope.data.website);
            fd.append('joined_on',$scope.data.joined_on);
            fd.append('qualification', $scope.data.qualification);
            
            console.log(JSON.stringify(fd));
            $http.post(globalServices.globalValue.baseURL +  'api/employee/'+globalServices.globalValue.school_id, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function () {
                    ngDialog.open({
                        template: '<p>Employee Information  submitted successfully.</p>',
                        plain: true
                    });
                   // $scope.data = [];

                })
                .error(function () {
                    ngDialog.open({
                        template: '<p>Some Error Occured!.</p>',
                        plain: true
                    });
                });
        }









        // $scope.selectedFile = null;
        // $scope.msg = "";


        $scope.loadFile = function (files) {

            console.log("messsage1");
            $scope.$apply(function () {

                $scope.selectedFile = files[0];
                console.log(file);
            })

        }

        $scope.handleFile = function () {
            console.log("messsage2");
            var file = $scope.selectedFile;
            console.log(file);

            if (file == undefined || file == null) {
                ngDialog.open({
                    template: '<p>Please Select a File </p>',
                    plain: true
                });
            }

            else if (file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type != "application/vnd.ms-excel") {
                ngDialog.open({
                    template: '<p>Not a Excel File (The file format should be xls or xlsx !....) </p>',
                    plain: true
                });
            }
            else {

                $scope.save(file);
            }


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


        $scope.save = function (file) {
            console.log("messsage3");
            console.log(file);

            var fd = new FormData();
            fd.append('file', file);
            // fd.append('data', 'string');
            $http.post(globalServices.globalValue.baseURL + 'api/bulk_upload_employees/' + globalServices.globalValue.school_id, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function () {
                    // console.log(JSON.stringify(data));
                    $timeout(function () {
                        ngDialog.open({
                            template: '<p>File Added Successfully.</p>',
                            plain: true
                        });
                    }, 300);

                })
                .error(function () {
                    ngDialog.open({
                        template: '<p>Some Error Occured!.</p>',
                        plain: true
                    });
                });
        }




    }])