angular.module('school_erp')
    .controller("noticeboardController", ['$http', '$scope','$filter','$rootScope', 'globalServices', 'NoticeBoardServices', 'ngDialog', function ($http, $scope, $filter,$rootScope, globalServices, NoticeBoardServices, ngDialog) {
        $scope.NoticeBoardData = [];
        $scope.editdata = [];


        NoticeBoardServices.getNoticeBoard()
            .success(function (data, status) {
                 console.log(JSON.stringify(data));
                $scope.NoticeBoardData = data.messages;
               
                console.log($scope.NoticeBoardData);
                 $scope.message_id = $scope.NoticeBoardData[0].messages_id;
            console.log($scope.message_id);
            })
            .error(function (data, success) {
            })



        $scope.addNoticeBoard = function (data) {
            console.log("message");
            var NoticeBoardDetails = {
                subject: $scope.data.subject,
                messages: $scope.data.message,
                date: new Date().toDateString(),
                time:$filter('date')(new Date(), 'HH:mm')
            }
            console.log(NoticeBoardDetails);
            NoticeBoardServices.setNoticeBoard(NoticeBoardDetails)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Notice Added Successfully.</p>',
                        plain: true
                    });
                    $scope.data = [];
                    NoticeBoardServices.getNoticeBoard()
                        .success(function (data, status) {
                            $scope.NoticeBoardData = data.messages;
                            console.log(JSON.stringify(data));
                            console.log($scope.NoticeBoardData);
                        })
                        .error(function (data, success) {
                        })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }

        // $scope.EditNoticeBoard = function (value, noticeboard) {

        //     console.log("messsage");
        //     $scope.noticeboard = angular.copy($scope.NoticeBoardData[value]);
        //     $scope.message_id = $scope.noticeboard.message_id;
        //     console.log($scope.message_id);
        //     var NoticeBoardDetails = {
        //         subject: $scope.noticeboard.subject,
        //         messages: $scope.noticeboard.messages,
        //         date: $scope.noticeboard.date,
        //     }
        //     console.log(NoticeBoardDetails);

        //     $scope.addEditEmployee(NoticeBoardDetails, $scope.message_id);
        // }

        // $scope.addEditNoticeBoard = function (NoticeBoardDetails, message_id) {
        //     NoticeBoardServices.EditNoticeBoard(NoticeBoardDetails, message_id)
        //         .success(function (data, status) {
        //             // ngDialog.open({
        //             //     template: '<p>Station is Edited Successfully.</p>',
        //             //     plain: true
        //             // });
        //             $scope.editdata = [];
        //             NoticeBoardServices.getNoticeBoard()
        //                 .success(function (data, status) {
        //                     $scope.NoticeBoardData = data.noticeboard;
        //                 })
        //                 .error(function (data, success) {
        //                 })
        //         })
        //         .error(function (data, success) {
        //             ngDialog.open({
        //                 template: '<p>Some Error Occured!</p>',
        //                 plain: true
        //             });
        //         })

        // }

        $scope.DeleteNoticeBoard = function (value) {
            $scope.editdata = angular.copy($scope.NoticeBoardData[value]);
            $scope.message_id = $scope.editdata.messages_id;
            console.log($scope.message_id);
            NoticeBoardServices.DeleteNoticeBoard($scope.message_id)
                .success(function (data, status) {
                    ngDialog.open({
                        template: '<p>Notice is Deleted Successfully.</p>',
                        plain: true
                    });
                    //$scope.editdata = [];
                    NoticeBoardServices.getNoticeBoard()
                        .success(function (data, status) {
                            $scope.NoticeBoardData = data.messages;
                        })
                        .error(function (data, success) {
                        })
                })
                .error(function (data, success) {
                    ngDialog.open({
                        template: '<p>Some Error Occured!</p>',
                        plain: true
                    });
                })
        }



        $scope.data = [{ "agence": "CTM", "secteur": "Safi", "statutImp": "operationnel" }];
        $scope.export = function () {

            html2canvas(document.getElementById('exportthis'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            //image: data,
                            //image: 'data:image/png;base64,...encodedContent...',
                            image: 'data/image1.png',
                            height: 150,
                            width: 500,
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
                }
            });
        }

        // html2canvas(document.getElementById('exportthis'), {
        //     onrendered: function (canvas) {
        // $scope.getAssignments = function (chapterId) {
        //     console.log($scope.chapterId);
        //     assignmentsServices.getAssignments($scope.chapterId, $scope.secId)
        //         .success(function (data, status) {
        //             console.log(status);
        //             $scope.assignmentsData = data.assignments;

        //         })
        //         .error(function (data, success) {
        //         });
        // }
        //         var data = canvas.toDataURL();
        //         var docDefinition = {
        //             content: [{
        //                 image: data,
        //                 width: 500,
        //             }]
        //         };
        //         pdfMake.createPdf(docDefinition).download("test.pdf");
        //     }
        // });




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
                url: globalServices.globalValue.baseURL + 'api/book/'+globalServices.globalValue.school_id,
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
        $scope.exportAction = function (option) {
            switch (option) {
                case 'pdf': $scope.$broadcast('export-pdf', {});
                    break;
                case 'excel': $scope.$broadcast('export-excel', {});
                    break;
                default: console.log('no event caught');
            }
        }

         // Role based Display
        $scope.showRole = function (role) {
            return globalServices.fetchRoleAuth(role);
        } 

        // if ($rootScope.role == 'parent') {

        //     $scope.secId = $rootScope.student.section;
        //     $scope.populateSubjects($scope.secId);


        // } else {
        //     $scope.getClassesInitalLoad();
        // }

    }])

