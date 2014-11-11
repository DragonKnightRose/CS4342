/*global angular */
'use strict';

angular.module('ExperimentManagerApp', [
  'ExperimentManagerApp.controllers',
  'ngRoute',
  'flow',
  'ui.bootstrap',
  'ngSanitize',
  'dialogs.main'
]).
config(['$routeProvider', 'dialogsProvider', function($routeProvider, dialogsProvider) {
	$routeProvider.
		when("/experiments", {templateUrl: "partials/experiments.html", controller: "experimentsController"}).
		when("/experiments/:name", {templateUrl: "partials/experiment.html", controller: "experimentDetailsController"}).
		when("/newExperiment/step1/:name", {templateUrl: "partials/newExperiment.html", controller: "experimentNewController"}).
		when("/newExperiment/step2/:name", {templateUrl: "partials/addQuestionnaire.html", controller: "questionController"}).
		when("/newExperiment/step3/:name", {templateUrl: "partials/emailList.html", controller: "experimentNewController"}).
		when("/newExperiment/step4/:name", {templateUrl: "partials/submit.html", controller: "submitController"}).
		when("/portals", {templateUrl: "partials/portalSelection.html", controller: "portalController"}).
		when("/experimenterLogin", {templateUrl: "partials/experimentPortal.html", controller: "experimenterLoginController"}).
		when("/drafts", {templateUrl: "partials/drafts.html", controller: "draftsController"}).
		when("/newQuestionnaire/:path/:name", {templateUrl: "partials/createQuestionnaire.html", controller: "newQuestionnaireController"}).
		when("/test", {templateUrl: "partials/test.html", controller: "testController"}).
		when("/uploadImage/:name", {templateUrl: "partials/uploadDialog", controller: "newQuestionnaireController"}).
		otherwise({redirectTo: '/portals'});
}],
['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'data/upload.php',
    permanentErrors: [404, 500, 501],
    maxChunkRetries: 1,
    chunkRetryInterval: 5000,
    simultaneousUploads: 4,
    singleFile: true
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);

