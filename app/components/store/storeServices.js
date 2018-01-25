angular.module('school_erp')
    .factory('storeServices', ['$http', 'globalServices', function ($http, globalServices) {
        var storeServices = {};

        storeServices.getVendor = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/vendor/' + globalServices.globalValue.school_id
            })
        };

        storeServices.setVendor = function (dataValue) {
            console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/vendor/' + globalServices.globalValue.school_id,
                data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

        storeServices.EditVendorDetails = function(dataValue, vendor_id){
                console.log(dataValue);
                return $http({
                            method: 'PUT',
                            url: globalServices.globalValue.baseURL + 'api/edit_vendor_events/'+ vendor_id,
                            data: $.param(dataValue),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        })
            };

        storeServices.DeleteVendor = function (vendor_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_vendor_events/' + vendor_id,
            })
        };    

        return storeServices;
    }]);  