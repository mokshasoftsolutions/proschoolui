angular.module('school_erp')
    .factory('barChartOneService', ['$http', 'globalServices', function ($http, globalServices) {
        var barChartOneService = {};

        barChartOneService.getExamMarks = function (paperId) {
            return $http({
                method: 'GET',
                //url: "http://192.168.1.13:4005/api/examevaluation/3/2347/34/45"
                 url: globalServices.globalValue.baseURL + 'api/examevaluation/'+paperId
            })
        };
        return barChartOneService;

    }])