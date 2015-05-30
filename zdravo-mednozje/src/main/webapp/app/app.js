(function() {
    "use strict";

    var app = angular.module("ASPO", [
        "ngRoute",
        "ui.bootstrap",
    ]);

    app.constant("_", window._);
	
	app.config(function($routeProvider) {
		$routeProvider
			// .when('/', {
				// templateurl : 'app/pages/home.html',
				// controller  : 'blankctrl'
			// })
			.when('/survey', {
				templateUrl : 'app/pages/survey.html',
				controller  : 'SurveyCtrl'
			})
			.when('/std-info', {
				templateUrl : 'app/pages/description.html',
				controller  : 'BlankCtrl'
			})
			.when('/symptoms', {
				templateUrl : 'app/pages/survey.html',
				controller  : 'BlankCtrl'
			})
			.when('/medical-examination', {
				templateUrl : 'app/pages/medical-examination.html',
				controller  : 'BlankCtrl'
			})
			.when('/protection', {
				templateUrl : 'app/pages/protection.html',
				controller  : 'BlankCtrl'
			})
			.when('/about-us', {
				templateUrl : 'app/pages/about.html',
				controller  : 'BlankCtrl'
			})
			.otherwise({ redirectTo: '/' });
	});
	
})();