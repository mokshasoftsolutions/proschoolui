angular.module('school_erp')
.factory('materialInServices', ['$http', 'globalServices', function ($http, globalServices) {

    var materialInServices = {};

    materialInServices.getMaterialIn = function () {
        return $http({
            method: 'GET',
            url: globalServices.globalValue.baseURL + 'api/material_in/' + globalServices.globalValue.school_id
        })
    };

    materialInServices.setMaterialIn = function (dataValue) {
        console.log(dataValue);
        return $http({
            method: 'POST',
            url: globalServices.globalValue.baseURL + 'api/material_in/' + globalServices.globalValue.school_id,
           data: $.param(dataValue),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
    };

    materialInServices.EditMaterialIn = function(dataValue, material_in_id){
          //  console.log(dataValue);
            return $http({
                        method: 'PUT',
                        url: globalServices.globalValue.baseURL + 'api/edit_material_in/'+ material_in_id,
                        data: $.param(dataValue),
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                    })
        };

        materialInServices.DeleteMaterialIn = function (material_in_id) {
        return $http({
            method: 'DELETE',
            url: globalServices.globalValue.baseURL + 'api/delete_material_in/' + material_in_id,
        })
    };
    return materialInServices;
}]); 
