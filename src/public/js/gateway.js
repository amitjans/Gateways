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
      notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
    });
  }

  $scope.create = function () {
    $http.post('/api/gateway', { serial_number: $scope.serial_number, name: $scope.name, ipv4: $scope.ipv4 }).then(function successCallback(response) {
      $scope.clear();
      $scope.list();
      console.log(response);
      notify(response.data.message);
    }, function errorCallback(response) {
      notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
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
      notify(response.data.message);
    }, function errorCallback(response) {
      notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
    });
  }

  $scope.details = function (item) {
    $scope._gateway = item;
    $('#gatewayModal').modal('show');
  }

  $scope.delete = function (id) {
    $http.delete('/api/gateway/' + id).then(function successCallback(response) {
      $scope.list();
      notify(response.data.message);
    }, function errorCallback(response) {
      notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
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