angular.module('school_erp')
.directive('exportTable', function(){
          var link = function ($scope, elm, attr) {
            $scope.$on('export-pdf', function (e, d) {
                elm.tableExport({ type: 'pdf', escape: false });
            });
            $scope.$on('export-excel', function (e, d) {
                elm.tableExport({ type: 'excel', escape: false });
            });
            // $scope.$on('export-doc', function (e, d) {
            //     elm.tableExport({ type: 'doc', escape: false });
            // });
            // $scope.$on('export-csv', function (e, d) {
            //     elm.tableExport({ type: 'csv', escape: false });
            // });
        }
        return {
            
            link: link
        }
})
.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
