gateways.controller('peripheral', ['$scope', '$http', function ($scope, $http) {
    $scope.peripherallist = [];
    $scope.gatewaylist = [];
    $scope.accion = 'Add';
    $scope.icon = true;
    $scope.updateid;

    $scope.list = function () {
        $http.get('/api/peripheral').then(function successCallback(response) {
            $scope.peripherallist = response.data;
        }, function errorCallback(response) {
            console.log(response.data.err);
        });
        $http.get('/api/gateway').then(function successCallback(response) {
            $scope.gatewaylist = response.data;
        }, function errorCallback(response) {
            console.log(response.data.err);
        });
    }

    $scope.create = function () {
        $http.post('/api/peripheral', { uid: $scope.uid, vendor: $scope.vendor, status: document.querySelector('#status').checked, gateway: $scope.gateway }).then(function successCallback(response) {
            $scope.clear();
            notify(response.data.success);
            $scope.list();
        }, function errorCallback(response) {
            notify(response.data.error, (response.status == 500 ? 'danger' : 'warning'));
        });
    }

    $scope.update = function (l) {
        $scope.uid = l.uid;
        $scope.vendor = l.vendor;
        document.querySelector('#status').checked = l.status;
        $scope.gateway = l.gateway._id;
        $scope.updateid = l._id;
        $scope.icon = false;
        $scope.accion = 'Edit';
    }

    $scope.updatesend = function () {
        $http.put('/api/peripheral/' + $scope.updateid, { uid: $scope.uid, vendor: $scope.vendor, status: document.querySelector('#status').checked, gateway: $scope.gateway }).then(function successCallback(response) {
            $scope.clear();
            $scope.list();
        }, function errorCallback(response) {
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/peripheral/' + id).then(function successCallback(response) {
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
        $scope.uid = '';
        $scope.vendor = '';
        document.querySelector('#status').checked = false;
        $scope.gateway = '';
    }

    $scope.list();
}]);