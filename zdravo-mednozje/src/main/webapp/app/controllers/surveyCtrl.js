(function () {
    "use strict";

    angular.module("ASPO").controller('SurveyCtrl', ["$scope", "AspoService", function ($scope, aspoService) {
        var that = this; // Save this into that for better minification results.
		
		that.answered = [{questionId: 0, answerId: 0}];
		that.questions = {}; // database of all questions
		$scope.displayedQuestions = []; // Questions in fringe, that were or will be displayed
		that.displayNr = 0; // Index of current questions in carousel
		
		// Mark current answer as inactive and set
		// next questions as active.
		function changeQuestion(direction) {
			$scope.displayedQuestions[that.displayNr].active = false;
			that.displayNr += direction;
			$scope.displayedQuestions[that.displayNr].active = true;
		}
		
		
		// Go through conditions if question display conditions
		// were satisfied. 
		function canDisplay(question) {
			
			var matchedDependecies = 0;
			
			// All conditions should be satisfied (and logical operation)
			for(var i = 0; i < question.dependencies.length; i++) {
				var dep = question.dependencies[i];
				
				// If previous questions has an ID 0, means always display
				if(dep.previusQuestionID == 0)
					return true;
				
				else
					// Go through all answered questions
					for(var j = 0; j < that.answered.length; j++) {
						// Match question dependeny to already answered questions
						// Skip if not found
						if(that.answered[j].questionId !== dep.previusQuestionID)
							continue;
							
						// if matched and answerID == 0, match any as in question ID
						// also match in specific question dependecy matches
						if(dep.answerID == 0 ||							
						   that.answered[j].answerId == dep.answerID)
							matchedDependecies++;
					}
			}
			
			// If all conditions were met, return true, otherwise false.
			return question.dependencies.length == matchedDependecies;
		}
		
		$scope.back = function() {
			if(that.displayNr <= 0)
				return;
		
			changeQuestion(-1);
		}
		
		$scope.next = function() {	
			// Save all asnwers and remove them from questions array
			for(var i = 0; i < $scope.displayedQuestions.length; i++) {
				var a = $scope.displayedQuestions[i];
				
				that.answered.push({
					questionId: a.qId,
					answerId: a.aId
				});
				
				that.questions = that.questions.filter(function(answer) {
					return answer.questionId !== a.qId;
				});
			}
			
			// Find all questions that should be displayed afterwards
			for(var i = 0; i < that.questions.length; i++) {
				if(canDisplay(that.questions[i]))
					$scope.displayedQuestions.push(that.questions[i]);
			}
			
			// No more questions left to display
			// TODO: Wrong condition due to made changes, fix
			if($scope.displayedQuestions.length == 0)
				end();
			else // Otherwise sort questions and display
				$scope.displayedQuestions.sort(function (a, b) {
					return a.sequence >  b.sequence;
				});
				
			// Move to next question
			if(that.displayNr < $scope.displayedQuestions.length-1)
				changeQuestion(+1);
		}
		
		// Call service to get all questions
		aspoService.getQuestions().then(function (questions) {
			// Add property to indicate which one is showed
			// Required for Bootstrap UI Carousel
			for(var i = 0; i < questions.length; i++)
				questions[i].active = false;
			
			// Sort based on display order
			$scope.displayedQuestions.sort(function (a, b) {
				return a.sequence > b.sequence;
			});
			
			// Mark first one as active and save all
			// questions in controller property variable.
			questions[0].active = true;
			that.displayNr = 0;
			that.questions = questions;
			
			// Find and display first questions
			$scope.next();
			changeQuestion(-1);
		});
	}]);
})();