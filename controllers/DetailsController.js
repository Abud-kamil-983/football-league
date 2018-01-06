myApp.controller('DetailsController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams){
	var main = this;
	this.getSingleMatch = function(){
		var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'});
		var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'});

		$q.all([promise1, promise2]).then(function(data){
			// getting route parameter provided by url
			main.roundId = $routeParams.roundID;
			main.matchId = $routeParams.matchID;
			main.singleMatch = data[0].data.rounds.concat(data[1].data.rounds);
		},
		function(error) {
			main.error = error.data;
		});
	};

}]);