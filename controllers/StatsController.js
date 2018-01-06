myApp.controller('StatsController', ['$http', '$q', '$routeParams', function($http, $q, $routeParams){
	var main = this;
	this.getTeamStats = function(){
		var promise1 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json', cache: 'true'});
		var promise2 = $http({method: 'GET', url: 'https://raw.githubusercontent.com/openfootball/football.json/master/2016-17/en.1.json', cache: 'true'});
		$q.all([promise1, promise2]).then(function(data){
			main.totalMatches = data[0].data.rounds.concat(data[1].data.rounds);
// console.log(main.totalMatches);
var totalMatchesPlayed = 0, totalWins = 0, totalLoss = 0, totalTie = 0, totalGoalsScored = 0
main.teamName = $routeParams.teamName;
// iterating over rounds
for(var i in main.totalMatches){
// iterating over matches
for(var j in main.totalMatches[i].matches){
// matching with route param
if(main.totalMatches[i].matches[j].team1.name == main.teamName){

	totalMatchesPlayed++;

	totalGoalsScored += main.totalMatches[i].matches[j].score1;

	if(main.totalMatches[i].matches[j].score1 == main.totalMatches[i].matches[j].score2){
		totalTie++;
	}
	else if(main.totalMatches[i].matches[j].score1 > main.totalMatches[i].matches[j].score2){
		totalWins++;
	}
	else if(main.totalMatches[i].matches[j].score1 < main.totalMatches[i].matches[j].score2){
		totalLoss++;
	}
}

else if(main.totalMatches[i].matches[j].team2.name == main.teamName){
	totalMatchesPlayed++;

	totalGoalsScored += main.totalMatches[i].matches[j].score2;

	if(main.totalMatches[i].matches[j].score1 == main.totalMatches[i].matches[j].score2){
		totalTie++;
	}
	else if(main.totalMatches[i].matches[j].score1 < main.totalMatches[i].matches[j].score2){
		totalWins++;
	}
	else if(main.totalMatches[i].matches[j].score1 > main.totalMatches[i].matches[j].score2){
		totalLoss++;
	}
}
}
}
main.totalWins = totalWins;
main.totalLoss = totalLoss;
main.totalTie = totalTie;
main.totalGoalsScored = totalGoalsScored;
main.totalMatchesPlayed = totalMatchesPlayed
// END-OF-ITERATE-THROUGH-ROUNDS
},
function(error) {
	main.error= error.data;
});
	};

}]);
