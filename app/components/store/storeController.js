angular.module('school_erp')
    .controller("storeController", ['$http', '$scope', '$rootScope', 'storeServices', 'ngDialog', function ($http, $scope, $rootScope, storeServices, ngDialog) {
        $scope.data = [];

        $scope.getVendor = function () {
            storeServices.getVendor()
                .success(function (data, status) {
                    $scope.data = data.vendor;
                    $scope.vendorDetails = $scope.data;
                    console.log(JSON.stringify(data));
                    // $scope.station_id = $scope.data[].station_id;
                    // console.log($scope.station_id);

                })
                .error(function (data, success) {
                });
        }

        $scope.addsetVendor = function (data) {
            var vendorDetails = {
                vendor_name: $scope.data.vendor_name,
                material: $scope.data.material,
                contact_no: $scope.data.contact_no,
                email: $scope.data.email,
                location: $scope.data.location,
                address: $scope.data.address,
            }
            console.log(vendorDetails);
            storeServices.setVendor(vendorDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Vendor details is Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    $scope.getVendor();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }
        $scope.EditVendor = function (value, vendor) {

            // console.log("messsage");
            $scope.vendor = angular.copy($scope.vendorDetails[value]);
            $scope.vendor_id = $scope.vendor.vendor_id;
            // console.log($scope.exam_paper_id);
            var vendor_details = {
                vendor_name: $scope.vendor.vendor_name,
                material: $scope.vendor.material,
                contact_no: $scope.vendor.contact_no,
                email: $scope.vendor.email,
                location: $scope.vendor.location,
                address: $scope.vendor.address
            }
            // console.log(Exam_PaperDetails);

            $scope.addEditVendor(vendor_details, $scope.vendor_id);
        }
        $scope.addEditVendor = function (vendor_details, vendor_id) {
            storeServices.EditVendorDetails(vendor_details, vendor_id)
                .success(function (data, status) {
                    // console.log(JSON.stringify(data));
                    // ngDialog.open({
                    //     template: '<p>Station is Edited Successfully.</p>',
                    //     plain: true
                    // });
                    $scope.editdata = [];
                    $scope.getVendor();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })

        }


        $scope.DeleteStore = function (value) {
            $scope.editdata = angular.copy($scope.data[value]);
            $scope.vendor_id = $scope.editdata.vendor_id;
            console.log($scope.vendor_id);
            storeServices.DeleteVendor($scope.vendor_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Station is Deleted Successfully.</p>',
                        plain: true
                    });
                    $scope.editdata = [];
                    $scope.getVendor();
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.getVendor();



    }])

