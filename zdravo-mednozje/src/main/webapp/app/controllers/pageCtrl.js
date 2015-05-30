(function () {
    "use strict";

    angular.module("ASPO").controller('PageCtrl', ["$location", function ($location) {
        var that = this;
		
		that.menuItems = [
			{
				text: 'Vprašalnik',
				link: '#/survey',
			},
			{
				text: 'Opis spolno prenosljivih okužb',
				link: '#/std-info',
			},
			{
				text: 'Simptomi',
				link: '#/symptoms',
			},
			{
				text: 'Pregled pri zdravniku',
				link: '#/medical-examination',
			},
			{
				text: 'Zaščita',
				link: '#/protection',
			},
			{
				text: 'O nas',
				link: '#/about-us',
			},
		]
		
		that.show = false;
		
		that.close = function() {
			$location.path("/");
			that.show = false;
		}
		
		that.navigate = function() {
			that.show = true;
		}
		
		that.show = $location.url() != '/' ;
	}]);
})();