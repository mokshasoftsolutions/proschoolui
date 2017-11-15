angular.module('school_erp')
    .controller("feeTypeController", ['$http', '$scope', 'feeTypeServices', 'globalServices', 'subjectsServices', 'ngDialog','$rootScope', function ($http, $scope, feeTypeServices, globalServices, subjectsServices, ngDialog,$rootScope) {
        $scope.feeTypeData = [];
        $scope.data = [];
       

      $scope.fee_catogery = [{
                name: "Annual Fee",
                id: 1
            },
            {
                name: "Monthly Fee",
                id: 2
            },
            {
                name: "Quarterly Fee",
                id: 3
            },
            {
                name: "Half-yearly Fee",
                id: 4
            },
            {
                name: "Extra Fee",
                id: 5
            }];
        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

       

        $scope.getFeeType = function () {
            feeTypeServices.getFeeType()
                .success(function (data, status) {
                   // console.log(subId)
                    $scope.feeTypeData = data.feetypes;
                    console.log(JSON.stringify(data))

                })
                .error(function (data, success) {});
        }


        $scope.addFeeType = function (data) {
            console.log("message");
            var FeeDetails = {
                fee_category: $scope.data.fee_catogery,
                fee_type: $scope.data.fee_type
               
            }
            feeTypeServices.setFeeType(FeeDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>FeeType are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getFeeType();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.EditFeeType = function (value, feeType) {

            console.log("messsage");
            $scope.feeType = angular.copy($scope.feeTypeData[value]);
           
             $scope.fee_types_id = $scope.feeType.fee_types_id;
            console.log($scope.fee_types_id);
            var FeeDetails = {
                fee_category: $scope.feeType.fee_category,
                fee_type: $scope.feeType.fee_type
               
            }
           
            $scope.addEditFeeType(FeeDetails ,$scope.fee_types_id);
        }
        $scope.addEditFeeType = function (FeeDetails ,fee_types_id) {
            feeTypeServices.EditFeeType(FeeDetails ,fee_types_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getFeeType();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteFeeType = function (value) {
            $scope.editdata = angular.copy($scope.feeTypeData[value]);
            $scope.fee_types_id = $scope.editdata.fee_types_id;
            console.log($scope.fee_types_id);
            feeTypeServices.DeleteFeeType($scope.fee_types_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Chapter is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                     $scope.getFeeType();
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
            console.log(JSON.stringify(data));

            $http({
                method: "POST",
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id,
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

       
        $scope.getFeeType();
    }])
