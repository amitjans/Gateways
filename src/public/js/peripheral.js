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
            notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
        });
        $http.get('/api/gateway').then(function successCallback(response) {
            $scope.gatewaylist = response.data;
        }, function errorCallback(response) {
            notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
        });
    }

    $scope.create = function () {
        let json = { uid: $scope.uid, vendor: $scope.vendor, status: document.querySelector('#status').checked, gateway: $scope.gateway };
        if (!$scope.gateway) delete json.gateway;
        $http.post('/api/peripheral', json).then(function successCallback(response) {
            $scope.clear();
            notify(response.data.message);
            $scope.list();
        }, function errorCallback(response) {
            notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
        });
    }

    $scope.update = function (l) {
        $scope.uid = l.uid;
        $scope.vendor = l.vendor;
        document.querySelector('#status').checked = l.status;
        $scope.gateway = l.gateway?._id || '';
        $scope.updateid = l._id;
        $scope.icon = false;
        $scope.accion = 'Edit';
    }

    $scope.updatesend = function () {
        let json = { uid: $scope.uid, vendor: $scope.vendor, status: document.querySelector('#status').checked, gateway: $scope.gateway };
        if (!$scope.gateway) delete json.gateway;
        $http.put('/api/peripheral/' + $scope.updateid, json).then(function successCallback(response) {
            $scope.clear();
            $scope.list();
            notify(response.data.message);
        }, function errorCallback(response) {
            notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
        });
    }

    $scope.delete = function (id) {
        $http.delete('/api/peripheral/' + id).then(function successCallback(response) {
            $scope.list();
            notify(response.data.mensaje);
        }, function errorCallback(response) {
            notify(response.data.message, (response.status == 500 ? 'danger' : 'warning'));
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