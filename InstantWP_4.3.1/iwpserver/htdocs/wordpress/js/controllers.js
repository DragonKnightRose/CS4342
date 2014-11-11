angular.module('ExperimentManagerApp.controllers', []).
controller('experimentsController', function($scope,$http) {
    
	$scope.misc='hello',
	$http.get('data/experiments.php').success(function(data) {
		$scope.experimentsList = data;
	});
	
	
}).
controller('draftsController', function($scope,$http, dialogs) {
    
	$scope.misc='hello',
	$http.get('data/drafts.php').success(function(data) {
		$scope.experimentsList = data;
	});
}).

controller('experimentDetailsController', function($scope, $routeParams, $http) {
	$scope.name = $routeParams.name,
	$http.get('data/' + 'experimentData.php?name='+ $routeParams.name).success(function(data) {
		$scope.parameters = data;
	});
	$http.get('data/questionnaire/'+ $routeParams.name +'Questionnaire.json').success(function(data){
		$scope.hasQuestionnaire=true;
	}).
	error(function(data){
		$scope.hasQuestionnaire = false;
	});
	
	$scope.uploadFile = function(){
		selected_file = document.getElementById('input').files[0];
		console.log(selected_file);
		$http({
			method : 'POST',
			url : 'data/upload.php',
			data: selected_file,
			headers : {'Content-Type': 'multipart/form-data'}
		});
	}
}).
controller('experimenterLoginController', function($scope){
	$scope.netID = "hci1414141414",
	$scope.password = "youdon'treallywanttoknow";
}).
controller('portalController', function($scope){
}).
controller('questionController', function($scope, $http, $routeParams){
	$scope.hasQuestionnaire = false;
	$http.get('data/' + 'draftDetails.php?name='+ $routeParams.name).success(function(data) {
		$scope.data = data;
	});
	$http.get('data/questionnaire/'+ $routeParams.name +'Questionnaire.json').success(function(data){
		$scope.hasQuestionnaire=true;
	}).
	error(function(data){
		$scope.hasQuestionnaire = false;
	});
	$scope.save = function(){
		info=$scope.data;
		$http({
			method: 'POST',
			url: 'data/addQuestionnaire.php',
			data: info,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

	}
	}).
controller('submitController', function($scope, $http, $routeParams){
	$http.get('data/' + 'draftDetails.php?name='+ $routeParams.name).success(function(data) {
		$scope.data = data;
	});
	$scope.save = function(){
		info=$scope.data;
		$http({
			method: 'POST',
			url: 'data/addQuestionnaire.php',
			data: info,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});

	};
	$scope.submit=function(){
		info=$scope.data;
		$http({
			method: 'POST',
			url: 'data/submitExperiment.php',
			data: info,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}
	}).


controller('experimentNewController', function($scope, $http, $routeParams, dialogs){
	$scope.data = {'name': 'default',
					'description': '',
					'startDate': '',
					'endDate':'',
					'duration':'',
					'location':'',
					'contactInfo':'',
					'maxParticipants':''},
	$http.get('data/' + 'draftDetails.php?name='+ $routeParams.name).success(function(data) {
		$scope.data = data;
	});
	$scope.save = function(notValid){
		console.log(notValid);
		if(notValid){
			errorMessage();
		}
		else{
		info=$scope.data;
		$http({
			method: 'POST',
			url: 'data/newExperiment.php',
			data: info,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
		}
	}
	$scope.errorMessage=function(){
		var dlg = dialogs.error('Experiment must have a title!');
	}
	}).

controller('newQuestionnaireController', function($scope, $routeParams, $http, dialogs) {
	$scope.mrImagePath ='';
	$scope.prImagePath='';
	$scope.mc_responses = [
	{'response':''},
	{'response':''},
	{'response':''}
	];
	$scope.cb_responses=[
	{'response':''},
	{'response':''},
	{'response':''}
	];
	$scope.questions = [];
	$scope.experimentName = $routeParams.name;
	$scope.path = $routeParams.path;
	
	$http.get('data/questionnaire/'+$routeParams.name+'Questionnaire.json').success(function(data){
		$scope.questions = data;
	});
	
	$scope.addCheckbox = function(newCheckQuestion){
		newQuestion = {'type': 'checkbox', 'question': '', 'answers':[], 'image':''};
		responses = [];
		for(i=0; i<$scope.cb_responses.length; i++){
			if($scope.cb_responses[i].response != ''){
				responses.push($scope.cb_responses[i]);
			}
		}
		
		newQuestion.question = newCheckQuestion;
		newQuestion.answers = responses;
		if($scope.mrImagePath!='')
			newQuestion.image=$scope.mrImagePath;
			
		$scope.questions.push(newQuestion);
		
		$scope.cb_responses=[
			{'response':''},
			{'response':''},
			{'response':''}
		];
		
		$scope.newCheckQuestion='';
		newCheckQuestion ='';
		return '';
		
	}
	$scope.addShortAnswer = function(question){
		newQuestion = {'type': 'shortAnswer', 'question': '', 'image':''};
		newQuestion.question=question;
		if($scope.prImagePath!=''){
			newQuestion.image=$scope.prImagePath;
		}	
		$scope.questions.push(newQuestion);
		return '';
	}
	$scope.addLongAnswer = function(question){
		newQuestion = {'type': 'longAnswer', 'question': '', 'image':''};
		newQuestion.question=question;
		if($scope.prImagePath!='')
			newQuestion.image=$scope.prImagePath;
			
		$scope.questions.push(newQuestion);
	}
	$scope.addMultipleChoice = function(question){
		newQuestion = {'type': 'multipleChoice', 'question': '', 'answers':[], 'image':''};
		responses = [];
		for(i=0; i<$scope.mc_responses.length; i++){
			if($scope.mc_responses[i].response != ''){
				responses.push($scope.mc_responses[i]);
			}
		}
		
		newQuestion.question = question;
		newQuestion.answers = responses;
		if($scope.mrImagePath!=''){
			newQuestion.image=$scope.mrImagePath;
		}
		$scope.questions.push(newQuestion);
	}
	$scope.removeMCResponse = function(){
		$scope.mc_responses.pop();
	}
	$scope.addMCResponse = function(){
		newResponse = {'response': ''};
		$scope.mc_responses.push(newResponse);
	}
	$scope.removeCheckResponse = function(){
		$scope.cb_responses.pop();
	}
	$scope.addCheckResponse = function(){
		newResponse = {'response': ''};
		$scope.cb_responses.push(newResponse);
	}
	$scope.addInstruction = function(){
		newQuestion = {'type' : 'instruction', 'question':''};
		if($scope.instructionQuestion != null && $scope.instructionQuestion !=''){
			newQuestion.question=$scope.instructionQuestion;
		}
		$scope.questions.push(newQuestion);
	}
	
	$scope.submit=function(){
		info=$scope.questions;
		$http({
			method: 'POST',
			url: 'data/submitQuestionnaire.php?name='+$scope.experimentName,
			data: info,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		});
	}

	$scope.launch = function(){
		var dlg = null;
		dlg= dialogs.create('partials/uploadDialog.html', 'uploadDialogController', {}, 'lg' );
		dlg.result.then(function(path){
			$scope.mrImagePath = path;
			console.log("image path:" + $scope.mrImagePath);
		});
		
	}
	
	$scope.launch2 = function(){
		var dlg = null;
		dlg= dialogs.create('partials/uploadDialog.html', 'uploadDialogController', {}, 'lg' );
		dlg.result.then(function(path){
			$scope.prImagePath = path;
			console.log("image path:" + $scope.prImagePath);
		});
		
	}
}).
controller('uploadDialogController', function($log, $scope, $modalInstance, data, dialogs){
	$scope.imagePath2 = '';
	var flow;
	
	$scope.close = function(){
			//$scope.imagePath='data/';
			$modalInstance.dismiss('canceled');
		}
	$scope.unimplemented = function(data){
		//$modalInstance.close();
		console.log("Data: " + data);
		$scope.imagePath2 = data;
		console.log("imagePath2: " + $scope.imagePath2);
		$modalInstance.close($scope.imagePath2);
		//dialogs.notify('Feature unimplemented', "We're sorry, but that feature has not yet been implemented.");
	}
}).

controller('testController', function($scope){
});
		