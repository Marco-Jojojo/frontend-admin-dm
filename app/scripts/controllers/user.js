'use strict';

angular.module('sbAdminApp')
  .controller('UserCtrl', ['$scope', '$compile', '$log', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$http', function($scope, $compile, $log, DTOptionsBuilder, DTColumnBuilder, $q, $http) {
	var vm = this;

	angular.element('#userForm').on('shown.bs.modal', function () {
		angular.element('#username').focus();
	});
	angular.element('.modal-content').keypress(function(e){
		if(e.which == 13) { //Enter key
	  		vm.create();
			angular.element('#userForm').modal('hide');
		}
	});

    vm.dtInstance = {};
    vm.users = {};
    vm.fromEdit = false;

    vm.dtOptions = DTOptionsBuilder.fromFnPromise(getData()).withPaginationType('full_numbers').withOption('createdRow', refresh);

    vm.dtColumns = [
        DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
        DTColumnBuilder.newColumn('departamento').withTitle('Departamento'),
        DTColumnBuilder.newColumn('telefono').withTitle('Teléfono'),
        DTColumnBuilder.newColumn('email').withTitle('E-mail'),
        DTColumnBuilder.newColumn('domicilio').withTitle('Domicilio'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable().renderWith(actionsHtml)
    ];

    vm.edit = function(user) {
    	vm.user = user;
		angular.element('#userForm').modal('show');
		vm.fromEdit = true;
        vm.dtInstance.rerender();
    }

    vm.delete = function(user) {
        $log.info(user);
    }

    function refresh(row, data, dataIndex) {
        $compile(angular.element(row).contents())($scope);
    }

    vm.clean = function() {
        vm.user.nombre = '';
    	vm.user.departamento = '';
    	vm.user.domicilio = '';
    	vm.user.telefono = '';
    	vm.user.email = '';
    	vm.fromEdit = false;
    }

    vm.create = function() {
    	$log.info(vm.user);
    	var id = 0;
    	if(vm.fromEdit) {
    		id = vm.user.id;
    	} else {
    		id = vm.dataJson.length;
    	}
    	vm.dataJson.push({
				"id": id,
			    "nombre": vm.user.nombre,
			    "departamento": vm.user.departamento,
			    "telefono": vm.user.telefono,
			    "email": vm.user.email,
			    "domicilio": vm.user.domicilio
			});
    	$log.info(vm.dataJson);
    	vm.dtInstance._renderer.rerender();
    }

    function actionsHtml(data, type, full, meta) {
        vm.users[data.id] = data;
        return 	'<div class="text-center"><button class="btn btn-info" ng-click="userCtrl.edit(userCtrl.users[' + data.id + '])">' +
	            '   <i class="fa fa-edit"></i>' +
	            '</button>&nbsp;' +
	            '<button class="btn btn-danger" ng-click="userCtrl.delete(userCtrl.users[' + data.id + '])">' +
	            '   <i class="fa fa-trash-o"></i>' +
	            '</button></div>';
    }
    function getData() {
        var defer = $q.defer();
        /*
        $http.get('/json').then(function(result) {
            defer.resolve(result.data);
        });
        */
        vm.dataJson = [
	    	{
	    		"id": 0,
			    "nombre": "Marco Alvarado",
			    "departamento": "Sistemas",
			    "telefono": "492 492 3155",
			    "email": "piyojr@gmail.com",
			    "domicilio": "Del Ángel #3"
			}, 
			{
				"id": 1,
			    "nombre": "Luis Fernando",
			    "departamento": "Sistemas",
			    "telefono": "449 222 1618",
			    "email": "pfernandofv@gmail.com",
			    "domicilio": "Calle del King #100"
			}, 
			{
				"id": 2,
			    "nombre": "Laura Ruelas",
			    "departamento": "Cobranza",
			    "telefono": "492 123 4567",
			    "email": "cobranza@donmiguel.com",
			    "domicilio": "Calle don Miguel #222"
			}, 
			{
				"id": 3,
			    "nombre": "Marco Alvarado",
			    "departamento": "Sistemas",
			    "telefono": "492 492 3155",
			    "email": "piyojr@gmail.com",
			    "domicilio": "Del Ángel #3"
			}, 
			{
				"id": 4,
			    "nombre": "Luis Fernando",
			    "departamento": "Sistemas",
			    "telefono": "449 222 1618",
			    "email": "pfernandofv@gmail.com",
			    "domicilio": "Calle del King #100"
			}, 
			{
				"id": 5,
			    "nombre": "Laura Ruelas",
			    "departamento": "Cobranza",
			    "telefono": "492 123 4567",
			    "email": "cobranza@donmiguel.com",
			    "domicilio": "Calle don Miguel #222"
			}
		];
		defer.resolve(vm.dataJson);
		return defer.promise;
	}

  }]);
