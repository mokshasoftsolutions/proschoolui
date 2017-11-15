angular.module('school_erp')
    .factory('addVehicleServices', ['$http', 'globalServices', function ($http, globalServices) {
        var addVehicleServices = {};

        addVehicleServices.getVehicle = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/vehicles/'+globalServices.globalValue.school_id
            })
        };

        addVehicleServices.setVehicle = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/vehicles/'+globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        addVehicleServices.EditVehicle = function (dataValue,vehicle_id) {
            console.log(dataValue);
            return $http({
                method: 'PUT',
                url: globalServices.globalValue.baseURL + 'api/edit_vehicle/'+vehicle_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        addVehicleServices.DeleteVehicle = function(vehicle_id){
           return $http({
                    method: 'DELETE',
                    url: globalServices.globalValue.baseURL + 'api/delete_vehicle/'+vehicle_id
                })
         }

        return addVehicleServices;
    }])
