angular.module('school_erp')
    .factory('barChartTwoService', ['$http', 'globalServices', function ($http, globalServices) {
        var barChartTwoService = {};

        barChartTwoService.getExamMarks = function (examScheduleId, studentId) {
            return $http({
                method: 'GET',
                 url: globalServices.globalValue.baseURL + 'api/exam_eval/' +studentId+ '/' +examScheduleId 
                //  url: "http://192.168.1.6:4005/api/examevaluationlistbystudentid/263/456"
                // url:"http://192.168.1.6:4005/api/examevaluationlistbystudentid/'" SCH-9271-EXM_SCH-1-SCH-9271-CL-1-SEC-1-SUB-1-EXM-1
                //url: globalServices.globalValue.baseURL + 'api/examevaluationlistbystudentid/' + examScheduleId + '/' + studentId
            })
        };
        return barChartTwoService;

    }])