myApp.controller('ListController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams){
	var main = this;
	this.getTeamList = function(){
		var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'});
		var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'});
		$q.all([promise1, promise2]).then(function(data){
			//concaneting bothe the matches held in two years
			main.totalMatches = data[0].data.rounds.concat(data[1].data.rounds);
			// console.log(main.totalMatches);
			var totalTeam = []
			// loop to filter team from match json
			for(var i = 0; i < main.totalMatches.length; i++) {
				var match = main.totalMatches[i];
				for(var j = 0; j < match.matches.length; j++) {
					totalTeam.push(match.matches[j].team1.name);
				}
			}
			// removing duplicate array item from team array
			main.uniqueTeam = totalTeam.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
		},
		function(error) {
			main.error= error.data;
		});
	};

}]);