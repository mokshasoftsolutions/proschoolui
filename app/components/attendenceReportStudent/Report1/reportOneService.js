angular.module('school_erp')
    .factory('donutChartOneService', ['$http', 'globalServices', function ($http, globalServices) {
        var donutChartOneService = {};

        donutChartOneService.getAttendenceByDay = function (select_date,class_id,section_id) {
            return $http({
                method: 'GET',
                //url: "http://192.168.1.6:4005/api/examevaluationlistbystudentid/263/456"
               url: globalServices.globalValue.baseURL + 'api/attendancechartbydate/'+select_date+'/'+class_id+'/'+section_id
            })
        };
        return donutChartOneService;

    }])