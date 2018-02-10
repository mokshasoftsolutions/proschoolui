angular.module('school_erp')
    .controller("collectFeeReportsController", ['$http', '$scope', 'ngDialog', '$rootScope', 'globalServices', 'feeMasterServices', 'collectFeeServices', 'feeTypeServices', function ($http, $scope, ngDialog, $rootScope, globalServices, feeMasterServices, collectFeeServices, feeTypeServices) {
        $scope.feeTypeData = [];
        $scope.data = [];



        $scope.select_date = new Date().toDateString();

        globalServices.getClass()
            .success(function (data, status) {
                $scope.classDatanew = data.school_classes; // Api list-name
                $scope.data.classId = data.school_classes[0].class_id;
                $scope.populateSections($scope.data.classId);
                $scope.populateFeeTypes($scope.data.classId);
                $scope.getFeeByDay($scope.select_date);

                // $scope.getFeeTypes($scope.data.classId);
            })
            .error(function (data, success) { })


        $scope.populateSections = function (classId) {
            globalServices.getSections(classId)
                .success(function (data, status) {
                    $scope.secData = data.class_sections; // Api list-name
                    $scope.data.secId = data.class_sections[0].section_id;
                    //  $scope.populateStudentValue($scope.data.secId);

                })
                .error(function (data, success) { })
        }


        $scope.populateFeeTypes = function (classId) {
            feeMasterServices.getFeeTypeByClassId(classId)
                .success(function (data, status) {

                    $scope.feeTypeData = data.feeTypes;

                    if ($scope.feeTypeData == 0) {
                        $scope.studentFeeReports = [];
                        ngDialog.open({
                            template: '<p>FeeType must be add to class.</p>',
                            plain: true
                        });


                    }
                    else {
                        $scope.feeTypeData = data.feeTypes; // Api list-name
                        $scope.data.fee_type_id = data.feeTypes[0].fee_types_id;
                        $scope.getFeeReports($scope.data.secId, $scope.data.fee_type_id);
                    }
                })
                .error(function (data, success) { })
        }





        $scope.getFeeReports = function (secId, fee_type_id) {
            collectFeeServices.getFeeReports(secId, fee_type_id)
                .success(function (data, status) {
                    $scope.studentFees = data.studentFee;
                    // console.log(subId)

                    console.log(JSON.stringify(data))

                    if (data == false || data == 'false') {
                        ngDialog.open({
                            template: '<p>FeeType must be add to class.</p>',
                            plain: true
                        });
                        $scope.studentFeeReports = [];

                    }
                    else {


                        $scope.studentFeeReports = [];
                        index = 0;
                        $scope.studentFees.forEach(function (element) {

                            var obj = {
                                id: index++,
                                Balance: element.Balance,
                                discount: element.Discount,
                                fine: element.fine,
                                DueDate: element.DueDate,
                                paidAmount: element.paidAmount,
                                studentName: element.studentName,
                                totalFee: element.totalFee,
                                //fee_types_id: element.fee_types_id,
                                //status:element.status


                            }
                            $scope.studentFeeReports.push(obj);
                            //console.log($scope.teacherData);
                        })
                    }
                    //$scope.collectFeeData = data.student_fee_deatils;

                })
                .error(function (data, success) { });
        }


        $scope.getFeeByDay = function (date) {
            // console.log("message");

            collectFeeServices.getFeeByDay(date)
                .success(function (data, status) {
                  //  console.log(JSON.stringify(data))
                    $scope.studentFeeByDate = data.fee;
                    $scope.parseInt = parseInt;
                    $scope.studentFeeDate = [];
                    index = 0;
                    $scope.fee = 0;
                    $scope.studentFeeByDate.forEach(function (element) {
                        $scope.totalFee = element.fee_paid;
                        var obj = {
                            id: index++,
                            fee_paid: element.fee_paid,
                            payment_mode: element.payment_mode,
                            discount: element.discount,
                            fine: element.fine,
                            current_date: element.current_date,
                            student_name: element.student_Name,
                            fee_type: element.fee_type,
                            DueDate: element.due_date,
                            totalFee: element.totalFee,
                            fee_types_id: element.fee_types_id,
                            student_id: element.student_id
                            //status:element.status


                        }
                        $scope.studentFeeDate.push(obj);


                        $scope.fee = $scope.fee + $scope.parseInt($scope.totalFee);
                       // console.log($scope.fee + "today total fee");
                    })


                })
                .error(function (data, success) {

                })

        }


        $scope.getFeeType = function () {
            feeTypeServices.getFeeType()
                .success(function (data, status) {
                    // console.log(subId)
                    $scope.feeType = data.feetypes;
                    //   console.log(JSON.stringify(data))



                })
                .error(function (data, success) { });
        }


        // $scope.EditFeeMaster = function (value, feeMaster) {

        //     console.log("messsage");
        //     $scope.feeMaster = angular.copy($scope.feeMasterData[value]);

        //     $scope.fee_master_id = $scope.feeMaster.fee_master_id;
        //     console.log($scope.fee_master_id);
        //     var FeeMasterDetails = {
        //         class_name: $scope.feeMaster.class_name,
        //         fee_type: $scope.feeMaster.fee_type,
        //         fee_amount:$scope.feeMaster.fee_amount

        //     }

        //     $scope.addEditFeeMaster(FeeMasterDetails, $scope.fee_master_id);
        // }
        // $scope.addEditFeeMaster = function (FeeMasterDetails, fee_master_id) {
        //     feeMasterServices.EditFeeMaster(FeeMasterDetails, fee_master_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             $scope.getFeeMaster();
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

        // $scope.DeleteFeeMaster = function (value) {
        //     $scope.editdata = angular.copy($scope.feeMasterData[value]);
        //     $scope.fee_master_id = $scope.editdata.fee_master_id;
        //     console.log($scope.fee_master_id);
        //     feeMasterServices.DeleteFeeMaster($scope.fee_master_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Chapter is Deleted Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.editdata = [];
        //             $scope.getFeeMaster();
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }

        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }



        $scope.getFeeByDay($scope.select_date);

        $scope.getFeeType();
        //$scope.getFee($scope.student_id);

    }])
