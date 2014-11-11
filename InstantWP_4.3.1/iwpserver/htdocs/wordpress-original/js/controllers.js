angular.module('ExperimentManagerApp.controllers', []).
controller('experimentsController', function($scope,$http) {
    
	$scope.misc='hello',
	$http.get('data/experiments.php').success(function(data) {
		$scope.experimentsList = data;
	});
	
	
}).

controller('experimentDetailsController', function($scope, $routeParams, $http) {
	$scope.name = $routeParams.name,
	$http.get('data/' + $routeParams.name + '.json').success(function(data) {
		$scope.parameters = data;
	});
});