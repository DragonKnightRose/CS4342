angular.module('ExperimentManagerApp', [
  'ExperimentManagerApp.controllers',
  'ngRoute'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when("/experiments", {templateUrl: "partials/experiments.html", controller: "experimentsController"}).
		when("/experiments/:name", {templateUrl: "partials/experiment.html", controller: "experimentDetailsController"}).
		when("/newExperiment/step1", {templateUrl: "partials/newExperiment.html", controller: "experimentNewController"}).
		when("/newExperiment/step2", {templateUrl: "partials/addQuestionnaire.html", controller: "experimentNewController"}).
		when("/newExperiment/step3", {templateUrl: "partials/emailList.html", controller: "experimentNewController"}).
		when("/newExperiment/step4", {templateUrl: "partials/submit.html", controller: "experimentNewController"}).
		otherwise({redirectTo: '/experiments'});
}]);
