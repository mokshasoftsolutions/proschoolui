angular.module('school_erp')
    .factory('classWiseServices', ['$http', 'globalServices', function ($http, globalServices) {
        var classWiseServices = {};

        classWiseServices.getTimeTable = function (SecId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/class_timetables/' + SecId
            })
        };



        classWiseServices.setTimeTable = function (dataValue, SecId, subId) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/class_timetable/' + SecId + '/' + subId,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        classWiseServices.EditTimeTable = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + '',
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        classWiseServices.getTimeTableDay = function (day, class_id) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/classes_timetable_by_day/' + day + '/' + class_id
            })
        };
        classWiseServices.getTimeTableByDayAndSection = function (day, secId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/class_timetable_by_day/' + day + '/' + secId
            })
        };

        classWiseServices.getTimeTableByStudent = function (day,secId) {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/class_timetable_by_day/' + day + '/' + secId
            })
        };


        return classWiseServices;
    }]);  