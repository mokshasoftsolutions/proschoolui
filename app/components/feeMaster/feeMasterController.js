angular.module('school_erp')
    .controller("feeMasterController", ['$http', '$scope', 'feeTypeServices', 'feeMasterServices', 'globalServices', 'subjectsServices', 'ngDialog', '$rootScope', function ($http, $scope, feeTypeServices, feeMasterServices, globalServices, subjectsServices, ngDialog, $rootScope) {
        $scope.feeTypeData = [];
        $scope.data = [];



        globalServices.getClass()

            .success(function (data, status) {
                   console.log(JSON.stringify(data))
                $scope.classData = data.school_classes;// Api list-name
                $scope.classId = $scope.classData[0].class_id;
                //$scope.populateSections($scope.classId)

            })
            .error(function (data, success) {
            })

        $scope.getFeeType = function () {
            feeTypeServices.getFeeType()
                .success(function (data, status) {
                    // console.log(subId)
                    $scope.feeTypeData = data.feetypes;
                    console.log(JSON.stringify(data))

                })
                .error(function (data, success) { });
        }

        $scope.getFeeMaster = function () {
            feeMasterServices.getFeeMaster()
                .success(function (data, status) {
                    // console.log(subId)
                    $scope.feeMasterData = data.feemaster;
                    console.log(JSON.stringify(data))

                })
                .error(function (data, success) { });
        }


        $scope.addFeeMaster = function (data) {
            console.log("message");
            var FeeMasterDetails = {
                class_name: $scope.data.class_name,
                fee_type: $scope.data.fee_type,
                fee_amount:$scope.data.amount

            }
            feeMasterServices.setFeeMaster(FeeMasterDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>FeeType are Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getFeeMaster();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.EditFeeMaster = function (value, feeMaster) {

            console.log("messsage");
            $scope.feeMaster = angular.copy($scope.feeMasterData[value]);

            $scope.fee_master_id = $scope.feeMaster.fee_master_id;
            console.log($scope.fee_master_id);
            var FeeMasterDetails = {
                class_name: $scope.feeMaster.class_name,
                fee_type: $scope.feeMaster.fee_type,
                fee_amount:$scope.feeMaster.fee_amount

            }

            $scope.addEditFeeMaster(FeeMasterDetails, $scope.fee_master_id);
        }
        $scope.addEditFeeMaster = function (FeeMasterDetails, fee_master_id) {
            feeMasterServices.EditFeeMaster(FeeMasterDetails, fee_master_id)
                .success(function (data, status) {
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getFeeMaster();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }

        $scope.DeleteFeeMaster = function (value) {
            $scope.editdata = angular.copy($scope.feeMasterData[value]);
            $scope.fee_master_id = $scope.editdata.fee_master_id;
            console.log($scope.fee_master_id);
            feeMasterServices.DeleteFeeMaster($scope.fee_master_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Chapter is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getFeeMaster();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
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


        $scope.getFeeMaster();
        $scope.getFeeType();
    }])
