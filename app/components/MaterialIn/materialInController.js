angular.module('school_erp')
    .controller("materialInController", ['$http', '$scope', '$rootScope', 'materialInServices', 'ngDialog', function ($http, $scope, $rootScope, materialInServices, ngDialog) {
        $scope.data = [];

        $scope.getmaterialIn = function () {
            materialInServices.getMaterialIn()
                .success(function (data, status) {
                    $scope.data = data.material_in;
                    console.log(JSON.stringify(data));
                    $scope.materialIn = $scope.data;
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);

                })
                .error(function (data, success) {
                });
        }

        $scope.addsetMaterialIn = function (data) {
            var materialIn = {
                material: $scope.data.material,
                vendor_name: $scope.data.vendor_name,
                no_of_units: $scope.data.no_of_units,
                price: $scope.data.price,
                purchased_date: $scope.data.purchased_date,
            }
            console.log(materialIn);
            materialInServices.setMaterialIn(materialIn)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vendor details is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getmaterialIn();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.EditMaterialIn = function (value, material) {

            // console.log("messsage");
            $scope.material = angular.copy($scope.materialIn[value]);
            $scope.material_in_id = $scope.material.material_in_id;
            // console.log($scope.exam_paper_id);
            var materialIn_details = {
                vendor_name: $scope.material.vendor_name,
                material: $scope.material.material,
                no_of_units: $scope.material.no_of_units,
                price: $scope.material.price,
                purchased_date: $scope.material.purchased_date

            }
            // console.log(Exam_PaperDetails);

            $scope.addEditMaterialIn(materialIn_details, $scope.material_in_id);
        }
        $scope.addEditMaterialIn = function (materialIn_details, material_in_id) {
            materialInServices.EditMaterialIn(materialIn_details, material_in_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getmaterialIn();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


        $scope.DeleteMaterialIn = function (value) {
            $scope.editdata = angular.copy($scope.data[value]);
            $scope.material_in_id = $scope.editdata.material_in_id;
            console.log($scope.material_in_id);
            materialInServices.DeleteMaterialIn($scope.material_in_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getmaterialIn();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.getmaterialIn();



    }])

