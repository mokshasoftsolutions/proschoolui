angular.module('school_erp')
    .controller("materialOutController", ['$http', '$scope', '$rootScope', 'materialOutServices', 'ngDialog', function ($http, $scope, $rootScope, materialOutServices, ngDialog) {
        $scope.data = [];

        $scope.getMaterialOut = function () {
            materialOutServices.getMaterialOut()
                .success(function (data, status) {
                   // $scope.data = data.material_out;
                   // console.log(JSON.stringify(data));
                    $scope.material = data.material_out;
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);
                    $scope.materialOut = [];
                    index = 0;
                    $scope.material.forEach(function (element) {

                        var obj = {
                            id: index++,
                            material_out_id:element.material_out_id,
                            name: element.name,
                            material: element.material,
                            no_of_units: element.no_of_units,
                            out_date: element.out_date,
                          
                           

                        }
                        $scope.materialOut.push(obj);
                        // console.log("mesaage for section");
                       // console.log($scope.employeeData);
                    })

                })
                .error(function (data, success) {
                });
        }

        $scope.addsetMaterialOut = function (data) {
            var materialOutDetails = {
                material: $scope.data.material,
                name: $scope.data.name,
                no_of_units: $scope.data.no_of_units,
                out_date: $scope.data.out_of_date,

            }
          //  console.log(materialOutDetails);
            materialOutServices.setMaterialOut(materialOutDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vendor details is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getMaterialOut();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.EditMaterialOut = function (value, material) {

            // console.log("messsage");
            $scope.material = angular.copy($scope.materialOut[value]);
            $scope.material_out_id = $scope.material.material_out_id;
            // console.log($scope.exam_paper_id);
            var materialOut_details = {
                name: $scope.material.name,
                material: $scope.material.material,
                no_of_units: $scope.material.no_of_units,
                out_date: $scope.material.out_date

            }
            // console.log(Exam_PaperDetails);

            $scope.addEditMaterialOut(materialOut_details, $scope.material_out_id);
        }
        $scope.addEditMaterialOut = function (materialOut_details, material_out_id) {
            materialOutServices.EditMaterialOut(materialOut_details, material_out_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getMaterialOut();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }



        $scope.DeleteMaterialOut = function (value) {
            $scope.editdata = angular.copy($scope.materialOut[value]);
            $scope.material_out_id = $scope.editdata.material_out_id;
            //console.log($scope.material_out_id);
            materialOutServices.DeleteMaterialOut($scope.material_out_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getMaterialOut();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.getMaterialOut();



    }])

