angular.module('school_erp')
	.factory('PaybandServices', ['$http', 'globalServices', function ($http, globalServices) {
		var PaybandServices = {};

		PaybandServices.getPay_band = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/pay_band/' + globalServices.globalValue.school_id
            })
        };

        PaybandServices.setPay_band = function (dataValue) {
            //  console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/pay_band/' + globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };
       return PaybandServices;

    }])