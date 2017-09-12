angular.module('school_erp')
    .controller("employeeDetailsController", ['$http', '$scope', 'employeeServices', 'ngDialog', function ($http, $scope, employeeServices, ngDialog) {
        $scope.employeeDetailsData = [];
        $scope.data = [];
        $scope.today1 = '01/01/1975';
        $scope.addEmployee = function (data) {
            var empDetails = {
                first_name: $scope.data.first_name,
                last_name: $scope.data.last_name,
                dob: $scope.data.dob,
                job_category: $scope.data.jobType,
                experience: $scope.data.experience,
                phone: $scope.data.phone,
                email: $scope.data.email,
                profile_image: "imageData",
                website: $scope.data.website,
                joined_on: $scope.data.joined_on,
                gender: $scope.data.gender,
                experience: $scope.data.experience,
                website: $scope.data.website,
                qualification: $scope.data.qualification
            }
            employeeServices.setEmployee(empDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Employeee Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
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

                    var workbook = XLSX.read(data, { type: 'binary' });

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
            console.log(JSON.stringify(data));

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
                }
                else {
                    $scope.msg = "Error : Something Wrong2";
                }
            }, function (error) {
                $scope.msg = "Error : Something Wrong3";
            })

        }

    }])