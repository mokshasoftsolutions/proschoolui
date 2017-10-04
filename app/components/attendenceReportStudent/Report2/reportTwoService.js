angular.module('school_erp')
    .factory('reportTwoService', ['$http', 'globalServices', function ($http, globalServices) {
        var reportTwoService = {};

        reportTwoService.getAttendenceByMonth = function (month,studentId) {
            return $http({
                method: 'GET',
               // url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                 url: globalServices.globalValue.baseURL + 'api/attendancechartbymonth/'+month+'/'+studentId
            })
        };
        return reportTwoService;

    }])