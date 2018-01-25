angular.module('school_erp')
	.controller("sessionController", ['$http', '$scope', '$rootScope', 'globalServices', 'sessionServices', 'ngDialog', function ($http, $scope, $rootScope, globalServices, sessionServices, ngDialog) {
		$scope.sessionData = [];

		$scope.getSession_timings = function () {
			sessionServices.getSession_timings()
				.success(function (data, status) {
					console.log(data);
					$scope.sessionData = data.session_timings; // Api list-name
				})
				.error(function (data, success) { })

		}

		$scope.addSession_timings = function (data) {
			var sessionDetails = {
				session: $scope.data.session,
				start_time: $scope.data.start_time,
				end_time: $scope.data.end_time,
			}

			console.log(sessionDetails);

			sessionServices.setSession_timings(sessionDetails)
				.success(function (data, status) {
					ngDialog.open({
						template: '<p>Session Timing is Added Successfully.</p>',
						plain: true
					});
					$scope.data = {};

					$scope.getSession_timings();
				})
				.error(function (data, success) {
					ngDialog.open({
						template: '<p>Some Error Occured!</p>',
						plain: true
					});
				})

		}

		$scope.EditSession = function (value, session) {

			//     console.log("messsage");
			$scope.session = angular.copy($scope.sessionData[value]);

			$scope.session_id = $scope.session.session_id;
			//     console.log($scope.fee_types_id);
			var sessionDetails = {
				session: $scope.session.session,
				start_time: $scope.session.start_time,
				end_time: $scope.session.end_time

			}

			$scope.addEditSession(sessionDetails, $scope.session_id);
		}
		$scope.addEditSession = function (sessionDetails, session_id) {
			sessionServices.EditSession(sessionDetails, session_id)
				.success(function (data, status) {
					// ngDialog.open({
					//     template: '<p>Station is Edited Successfully.</p>',
					//     plain: true
					// });
					$scope.editdata = [];
					$scope.getSession_timings();
				})
				.error(function (data, success) {
					ngDialog.open({
						template: '<p>Some Error Occured!</p>',
						plain: true
					});
				})

		}

		$scope.DeleteSession = function (value) {
			$scope.editdata = angular.copy($scope.sessionData[value]);
			$scope.session_id = $scope.editdata.session_id;
			//    console.log($scope.fee_types_id);
			sessionServices.DeleteSession($scope.session_id)
				.success(function (data, status) {
					ngDialog.open({
						template: '<p>Session is Deleted Successfully.</p>',
						plain: true
					});
					$scope.editdata = [];
					$scope.getSession_timings();
				})
				.error(function (data, success) {
					ngDialog.open({
						template: '<p>Some Error Occured!</p>',
						plain: true
					});
				})
		}



		$scope.getSession_timings();

	}])