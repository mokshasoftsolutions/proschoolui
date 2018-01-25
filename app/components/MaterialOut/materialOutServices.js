angular.module('school_erp')
    .factory('materialOutServices', ['$http', 'globalServices', function ($http, globalServices) {

        var materialOutServices = {};

        materialOutServices.getMaterialOut = function () {
            return $http({
                method: 'GET',
                url: globalServices.globalValue.baseURL + 'api/material_out/' + globalServices.globalValue.school_id
            })
        };

        materialOutServices.setMaterialOut = function (dataValue) {
             console.log(dataValue);
            return $http({
                method: 'POST',
                url: globalServices.globalValue.baseURL + 'api/material_out/' + globalServices.globalValue.school_id,
                 data: $.param(dataValue),
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })
        };

          materialOutServices.EditMaterialOut = function(dataValue, material_out_id){
                console.log(dataValue);
                return $http({
                            method: 'PUT',
                            url: globalServices.globalValue.baseURL + 'api/edit_material_out/'+ material_out_id,
                            data: $.param(dataValue),
                            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        })
            };

        materialOutServices.DeleteMaterialOut = function (material_out_id) {
            return $http({
                method: 'DELETE',
                url: globalServices.globalValue.baseURL + 'api/delete_material_out/' + material_out_id,
            })
        };
        return materialOutServices;
    }]); 
