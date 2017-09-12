angular.module('school_erp')
    .controller("feeTypeController", ['$http', '$scope', 'feeTypeServices', 'globalServices', 'subjectsServices', 'ngDialog','$rootScope', function ($http, $scope, feeTypeServices, globalServices, subjectsServices, ngDialog,$rootScope) {
        $scope.feeTypeData = [];
        $scope.data = [];
       
        // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        }

       

        $scope.getFeeType = function () {
            feeTypeServices.getFeeType()
                .success(function (data, status) {
                    console.log(subId)
                    $scope.feeTypeData = data;
                    console.log(JSON.stringify(data))

                })
                .error(function (data, success) {});
        }


        $scope.addFeeType = function (data) {
            console.log("message");
            var FeeDetails = {
                fee_catogery: $scope.data.fee_catogery,
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

        // $scope.EditFeeType = function (value, chapter) {

        //     console.log("messsage");
        //     $scope.chapter = angular.copy($scope.chaptersData[value]);
        //     console.log($scope.chapter);
        //      $scope.chapter_id = $scope.chapter.lession_id;
        //     console.log($scope.chapter_id);
        //     var ChapterDetails = {
        //         title: $scope.chapter.title,
        //         chapter_code: $scope.chapter.chapter_code,
             
        //         description: $scope.chapter.description,
        //         no_of_topics: $scope.chapter.no_of_topics,
        //     }
        //     console.log(ChapterDetails);
           
        //     $scope.addEditFeeType(ChapterDetails ,$scope.chapter_id);
        // }
        // $scope.addEditFeeType = function (ChapterDetails ,chapter_id) {
        //     chaptersServices.EditFeeType(ChapterDetails ,chapter_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             $scope.getFeeType($scope.subId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

        // $scope.DeleteFeeType = function (value) {
        //     $scope.editdata = angular.copy($scope.chaptersData[value]);
        //     $scope.chapter_id = $scope.editdata.lession_id;
        //     console.log($scope.chapter_id);
        //     chaptersServices.DeleteFeeType($scope.chapter_id)
        //         .success(function (data, status) {
        //             ngDialog.open({
        //                 template: '<p>Chapter is Deleted Successfully.</p>',
        //                 plain: true
        //             });
        //             $scope.editdata = [];
        //              $scope.getFeeType($scope.subId);
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })
        // }


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
                url: "globalServices.globalValue.baseURL + 'api/book/SCH-9271'",
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
