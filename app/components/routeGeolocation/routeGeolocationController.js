angular.module('school_erp')
  .controller("routeGeoLocationController", ['$http', '$scope', 'addVehicleServices','routeGeoLocationServices', function ($http, $scope, addVehicleServices,routeGeoLocationServices) {
    // $scope.code = 900;
    addVehicleServices.getVehicle()
      .success(function (data, status) {
        console.log(JSON.stringify(data));
        $scope.vehicles = data.vehicles;
        $scope.vehicle_code = $scope.vehicles[0].vehicle_code;
        console.log($scope.vehicle_code);
      })
      .error(function (data, success) {
      });

    var mapOptions = {
      zoom: 5,
      center: new google.maps.LatLng(17.745875, 83.314301),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    var image = {
      url: 'school_bus.png',

      scaledSize: new google.maps.Size(40, 40), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0) // anchor

    };
    infowindow = new google.maps.InfoWindow();

    var createMarker = function (lat, lng, id, address) {

      var marker = new google.maps.Marker({
        map: $scope.map,
        position: new google.maps.LatLng(lat, lng),
        animation: google.maps.Animation.DROP,
        icon: image,
        title: "Bus Id: " + id + ",   address: " + address

      });
      // marker.content = '<div class="infoWindowContent">' + infowindow.address + '</div>';
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent('<h2>' + marker.title + '</h2>');
        infowindow.open($scope.map, marker);
      });

      $scope.map.setZoom(18);
      $scope.map.panTo(marker.position);
      $scope.markers.push(marker);

    }

    $scope.getGeolocation = function (vehicle_code) {
      console.log("message");
      routeGeoLocationServices.getGeolocation(vehicle_code)
        .success(function (data, status) {
          $scope.status = status;
          $scope.JSONdata = data;
          console.log(JSON.stringify(data));
          //for POST
          $scope.latitude = data.positions.latitude;
          $scope.longitude = data.positions.longitude;
          $scope.id = data.positions.deviceId;
          $scope.address = data.positions.address;
          //for GET
          // $scope.latitude = data[0].docPickUpAddress;
          // $scope.longitude = data[0].avAddress;
          //some google api data
          //$scope.latitude=data.results[0].geometry.location.lat;
          //$scope.longitude=data.results[0].geometry.location.lng;
          console.log($scope.latitude);
          console.log($scope.longitude);
          createMarker($scope.latitude, $scope.longitude, $scope.id, $scope.address);
        })
        .error(function (data, success) {
        })
    }
    //some google api
    //$http({ method: 'GET', url: "http://maps.google.com/maps/api/geocode/json?address=Canada&sensor=true&region=USA" }).
    //traccar api's
    $http({ method: 'GET', url: "http://192.168.1.4:2016/api/netcomp/getAllDevicesDetails" }).
      //$http.post("http://192.168.1.4:2016/netcomp/getDeviceCodeDetails", { deviceCode: $scope.code }, { headers: { 'Content-type': 'application/json' } }).

      success(function (data, status) {
        $scope.status = status;
        $scope.JSONdata = data;
        console.log(JSON.stringify(data));
        //for POST
        $scope.latitude = data.positions.latitude;
        $scope.longitude = data.positions.longitude;
        $scope.id = data.positions.deviceId;
        $scope.address = data.positions.address;
        //for GET
        // $scope.latitude = data[0].docPickUpAddress;
        // $scope.longitude = data[0].avAddress;
        //some google api data
        //$scope.latitude=data.results[0].geometry.location.lat;
        //$scope.longitude=data.results[0].geometry.location.lng;
        console.log($scope.latitude);
        console.log($scope.longitude);
        createMarker($scope.latitude, $scope.longitude, $scope.id, $scope.address);
        //createInfoWindow($scope.id, $scope.address);
      }).
      error(function (data, status) {
        $scope.JSONdata = data || "Request failed";
        $scope.status = status;
        console.log($scope.data + $scope.status);
      });
    $scope.getGeolocation($scope.vehicle_code);
  }])

