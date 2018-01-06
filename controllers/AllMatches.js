myApp.controller('AllMatches',[ '$http', '$q', function($http, $q){
	var main = this;
	//function to get all matches
	this.getAllTheMacthes = function(){
		var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'});
		var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'});

		$q.all([promise1, promise2]).then(function(response){
			// concanting year to each match
			for (var i in response[0].data.rounds) {
				response[0].data.rounds[i].name = response[0].data.rounds[i].name+'(2015-2016)';	
			}
			for (var i in response[1].data.rounds) {
				response[1].data.rounds[i].name = response[1].data.rounds[i].name+'(2016-2017)';	
			}
			// combining all the matches helb in two years
			main.allMatches = response[0].data.rounds.concat(response[1].data.rounds);
		},
		function(error) {
			main.error = error.data;
		});

	};


}]);