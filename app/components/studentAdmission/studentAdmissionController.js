angular.module('school_erp')
    .controller("studentAdmissionController", ['$http', '$scope', 'studentServices', 'ngDialog', 'globalServices', 'BusRouteServices', function ($http, $scope, studentServices, ngDialog, globalServices, BusRouteServices) {
        $scope.classData = [];
        $scope.data = [];
        $scope.busRoutes = [];
        $scope.excel = false;
        $scope.data.admission_date = new Date().toDateString();
        BusRouteServices.getBusRoute()
            .success(function (data, status) {
                //   console.log(JSON.stringify(data));
                $scope.busRoutes = data.Bus_Route;
                $scope.routeId = $scope.busRoutes[0].bus_route_id;
            })
            .error(function (data, success) {
            })



        globalServices.getClass()
            .success(function (data, status) {
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                $scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.populateSections = function (classId) {
            //$scope.excel = false;
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections;// Api list-name
                    $scope.secId = $scope.secData[0].section_id;
                    // $scope.getStudentValue($scope.secId);
                })
                .error(function (data, success) {
                })
        }

        studentServices.getParentListBySchool()
            .success(function (data, status) {
                $scope.parentsList = data.parents;// Api list-name


            })
            .error(function (data, success) {
            })


        $scope.selectedFile = null;

        $scope.loadImage = function (files) {


            $scope.$apply(function () {

                $scope.selectedFile = files[0];

                $scope.message = "";
                if ($scope.selectedFile.type != "image/jpeg" && $scope.selectedFile.type != "image/png") {

                    $scope.message = "Not a Image File !..";
                }

                else if ($scope.selectedFile.size >= "1048576") {
                    $scope.message = "Image size exceed..(below 1MB)";

                } else {
                    $scope.handleFiles($scope.selectedFile);
                }
            })

        }
        $scope.files = [];
        $scope.handleFiles = function (file) {
            $scope.files.push(file);

        }



        $scope.data.choices = [{ id: 'choice0' }];

        $scope.addNewChoice = function () {
            var newItemNo = $scope.data.choices.length + 1;

            $scope.data.choices.push({ 'id': 'choice' + newItemNo });

        };

        $scope.removeChoice = function () {
            var lastItem = $scope.data.choices.length - 1;
            $scope.data.choices.splice(lastItem);
            $scope.files.splice(-1, 1);

            documentLength = $scope.files.length;
            console.log(documentLength);
        };

        $scope.handleImage = function (data) {


            console.log($scope.files);
            var fd = new FormData();
            for (var i in $scope.files) {
                fd.append("files", $scope.files[i]);
            }



            fd.append('first_name', $scope.data.first_name);
            fd.append('last_name', $scope.data.last_name);
            fd.append('gender', $scope.data.gender);
            fd.append('dob', $scope.data.dob);
            fd.append('religion', $scope.data.religion);
            fd.append('aadhar_no', $scope.data.aadhar_no);
            fd.append('phone', $scope.data.phone);
            fd.append('email', $scope.data.email);
            fd.append('category', $scope.data.category);
            fd.append('admission_date', $scope.data.admission_date);
            fd.append('admission_no', $scope.data.admission_no);
            fd.append('roll_no', $scope.data.roll_no);
            fd.append('academic_year', $scope.data.academic_year);
            fd.append('bus_route_id', $scope.data.routeId);
            fd.append('cur_address', $scope.data.cur_address);
            fd.append('cur_city', $scope.data.cur_city);
            fd.append('cur_state', $scope.data.cur_state);
            fd.append('cur_pincode', $scope.data.cur_pincode);
            fd.append('perm_address', $scope.data.perm_address);
            fd.append('perm_city', $scope.data.perm_city);
            fd.append('perm_state', $scope.data.perm_state);
            fd.append('perm_pincode', $scope.data.perm_pincode);
            fd.append('father_name', $scope.data.father_name);
            fd.append('mother_name', $scope.data.mother_name);
            fd.append('gaurdian_name', $scope.data.gaurdian_name);
            fd.append('father_contact', $scope.data.father_contact);
            fd.append('mother_contact', $scope.data.mother_contact);
            fd.append('gaurdian_contact', $scope.data.gaurdian_contact);
            fd.append('gaurdian_relation', $scope.data.gaurdian_relation);
            fd.append('gaurdian_occupation', $scope.data.gaurdian_occupation);
            fd.append('gaurdian_address', $scope.data.gaurdian_address);
            fd.append('mother_occupation', $scope.data.mother_occupation);
            fd.append('father_occupation', $scope.data.father_occupation);
            fd.append('parent_account_create', $scope.data.parentAccount);
            fd.append('parent_account_new', $scope.data.parentAccountCreate);
            fd.append('parent_id', $scope.data.parentId);
            fd.append('blood_group', $scope.data.bloodGroup);
            fd.append('father_email', $scope.data.fatheremail);
            fd.append('mother_email', $scope.data.motheremail);

            fd.append('gaurdian_email', $scope.data.gaurdianemail);

            $http.post(globalServices.globalValue.baseURL + 'api/students/' + $scope.secId, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
                .success(function (data) {

                    if (data == 'null' | data == null) {
                        ngDialog.open({
                            template: '<p style="color:red;">Please fill the mandatory feilds.</p>',
                            plain: true
                        });
                    } else {
                        ngDialog.open({
                            template: '<p>Student Information  submitted successfully.</p>',
                            plain: true
                        });
                        $scope.data = [];
                        $scope.files = [];
                        $scope.data.choices = [{ id: 'choice0' }];
                    }
                })
                .error(function () {
                    ngDialog.open({
                        template: '<p>Some Error Occured!.</p>',
                        plain: true
                    });
                });
        }


        // for Excel Upload

        $scope.loadFile = function (files) {


            $scope.$apply(function () {

                $scope.selectedFile = files[0];

            })

        }

        $scope.handleFile = function (secId) {

            var file = $scope.selectedFile;

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

                $scope.save(file, secId);
            }


        }


        $scope.save = function (file, secId) {

            var fd = new FormData();
            fd.append('file', file);

            $http.post(globalServices.globalValue.baseURL + 'api/bulk_upload_students/' + secId, fd, {
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




        // $scope.generateExcel = function () {
        //     $scope.excel = true;
        //     //  console.log("pdf message1");
        //     html2canvas(document.getElementById('exportthis'), {
        //         onrendered: function (canvas) {
        //             var data = canvas.toDataURL();
        //             var docDefinition = {
        //                 content: [{
        //                     image: data,
        //                     width: 480,
        //                 }]
        //             };
        //             // console.log("pdf message2");

        //             pdfMake.createPdf(docDefinition).download("Students_Report.pdf");
        //             $scope.getStudentValue($scope.secId);
        //         }
        //     });
        // }

        $scope.export = function () {
            $scope.excel = true;
            $http.get(globalServices.globalValue.baseURL + 'api/image/studentExcel.xlsx', { responseType: 'arraybuffer' }
            ).then(function (response) {
                //  console.log(response);
                // var header = response.headers('application/json')
                var fileName = 'studentExcel';
                //  console.log(fileName);

                var blob = new Blob([response.data],
                    { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                var objectUrl = (window.URL || window.webkitURL).createObjectURL(blob);
                var link = angular.element('<a/>');
                link.attr({
                    href: objectUrl,
                    download: fileName
                })[0].click();
            })
            $scope.excel = false;
        };
        // for Role

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

    }])

