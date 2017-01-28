'use strict';

angular.module('sbAdminApp')
  .controller('UserCtrl', ['$scope','$log', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', '$q', '$http', function($scope, $log, $compile, DTOptionsBuilder, DTColumnBuilder, $q, $http) {

	var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.dtInstance = {};
    vm.persons = {};

    vm.dtOptions = DTOptionsBuilder.fromFnPromise(getData())
    	.withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('nombre').withTitle('Nombre'),
        DTColumnBuilder.newColumn('departamento').withTitle('Departamento'),
        DTColumnBuilder.newColumn('telefono').withTitle('Teléfono'),
        DTColumnBuilder.newColumn('email').withTitle('E-mail'),
        DTColumnBuilder.newColumn('domicilio').withTitle('Domicilio'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
    ];

    function edit(person) {
        vm.message = 'You are trying to edit the row: ' + JSON.stringify(person);
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function deleteRow(person) {
        vm.message = 'You are trying to remove the row: ' + JSON.stringify(person);
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }

    vm.create = function createNew(user) {
    	alert(user);
    	vm.user = user;
    	vm.dataJson.push(vm.user);
    	//TODO: Refresh the DataTable with the new user.
    	$log.info(vm.dataJson);
    }

    function actionsHtml(data, type, full, meta) {
        vm.persons[data.id] = data;
        return 	'<div class="text-center"><button class="btn btn-info" ng-click="userCtrl.edit(userCtrl.persons[' + data.id + '])">' +
	            '   <i class="fa fa-edit"></i>' +
	            '</button>&nbsp;' +
	            '<button class="btn btn-danger" ng-click="userCtrl.delete(userCtrl.persons[' + data.id + '])" )"="">' +
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
	    		"id": "1",
			    "nombre": "Marco Alvarado",
			    "departamento": "Sistemas",
			    "telefono": "492 492 3155",
			    "email": "piyojr@gmail.com",
			    "domicilio": "Del Ángel #3"
			}, 
			{
				"id": "2",
			    "nombre": "Luis Fernando",
			    "departamento": "Sistemas",
			    "telefono": "449 222 1618",
			    "email": "pfernandofv@gmail.com",
			    "domicilio": "Calle del King #100"
			}, 
			{
				"id": "3",
			    "nombre": "Laura Ruelas",
			    "departamento": "Cobranza",
			    "telefono": "492 123 4567",
			    "email": "cobranza@donmiguel.com",
			    "domicilio": "Calle don Miguel #222"
			}, 
			{
				"id": "4",
			    "nombre": "Marco Alvarado",
			    "departamento": "Sistemas",
			    "telefono": "492 492 3155",
			    "email": "piyojr@gmail.com",
			    "domicilio": "Del Ángel #3"
			}, 
			{
				"id": "5",
			    "nombre": "Luis Fernando",
			    "departamento": "Sistemas",
			    "telefono": "449 222 1618",
			    "email": "pfernandofv@gmail.com",
			    "domicilio": "Calle del King #100"
			}, 
			{
				"id": "6",
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