gateways.controller('gateway', ['$scope', '$http', function ($scope, $http) {
    $scope.gatewaylist = [];
    $scope.accion = 'Add';
    $scope.icon = true;
    $scope.updateid;
    $scope._gateway = {};

    $scope.list = function () {
      $http.get('/api/gateway').then(function successCallback(response) {
        $scope.gatewaylist = response.data;
      }, function errorCallback(response) {
        console.log(response.data.err);
      });
    }

    $scope.create = function () {
      $http.post('/api/gateway', { serial_number: $scope.serial_number, name: $scope.name, ipv4: $scope.ipv4 }).then(function successCallback(response) {
        $scope.clear();
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.update = function (l) {
      $scope.serial_number = l.serial_number;
      $scope.name = l.name;
      $scope.ipv4 = l.ipv4;
      $scope.updateid = l._id;
      $scope.icon = false;
      $scope.accion = 'Edit';
    }

    $scope.updatesend = function () {
      $http.put('/api/gateway/' + $scope.updateid, { serial_number: $scope.serial_number, name: $scope.name, ipv4: $scope.ipv4 }).then(function successCallback(response) {
        $scope.clear();
        $scope.list();
      }, function errorCallback(response) {
      });
    }

    $scope.details = function (item) {
      $scope._gateway = item;
      $('#gatewayModal').modal('show');
    }

    $scope.delete = function (id) {
      $http.delete('/api/gateway/' + id).then(function successCallback(response) {
        //notify(response.data.mensaje);
        $scope.list();
        up();
      }, function errorCallback(response) {
        notify(response.data.mensaje);
      });;
    }

    $scope.clear = function () {
      $scope.updateid = '';
      $scope.accion = 'Add';
      $scope.icon = true;
      $scope.serial_number = '';
      $scope.name = '';
      $scope.ipv4 = '';
  }

    $scope.list();
  }]);