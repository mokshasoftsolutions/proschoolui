angular.module('school_erp')
	.factory('sessionServices', ['$http', 'globalServices', function ($http, globalServices) {
		var sessionServices = {};

		sessionServices.getSession_timings = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/session_timings/' + globalServices.globalValue.school_id
            })
        };

        sessionServices.setSession_timings = function (dataValue) {
            //  console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/session_timings/' + globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        sessionServices.EditSession = function (dataValue, session_id) {
            //  console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_session/' + session_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        sessionServices.DeleteSession = function (session_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_session/' + session_id,
            })
        };
        return sessionServices;

    }])