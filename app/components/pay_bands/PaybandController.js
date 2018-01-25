angular.module('school_erp')
	.controller("PaybandController", ['$http', '$scope', '$rootScope', 'globalServices', 'PaybandServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, PaybandServices, ngDialog) {
		$scope.PaybandData = [];

		$scope.getPay_band = function () {
			PaybandServices.getPay_band()
				.success(function (data, status) {
					$scope.PaybandData = data.pay_band; // Api list-name
				})
				.error(function (data, success) { })

		}

		$scope.addPay_band = function (data) {
			var PaybandDetails = {
				pay_band: $scope.data.pay_band,
				basic: $scope.data.basic,
				DA: $scope.data.DA,
				HRA: $scope.data.HRA,
				CA: $scope.data.CA,
				ALOW: $scope.data.ALOW,
				ARR: $scope.data.ARR,
				EPF: $scope.data.EPF,
				ESIC: $scope.data.ESIC,
				TDS: $scope.data.TDS,
			}

			PaybandServices.setPay_band(PaybandDetails)
				.success(function (data, status) {
					ngDialog.open({
						template: '<p>Pay Band is Added Successfully.</p>',
						plain: true
					});
					$scope.data = {};

					$scope.getPay_band();
				})
				.error(function (data, success) {
					ngDialog.open({
						template: '<p>Some Error Occured!</p>',
						plain: true
					});
				})

		}


		$scope.getPay_band();

	}])